-- ================================================================
-- DialSurge Database Schema
-- Paste this into the Supabase SQL Editor and run it
-- ================================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ================================================================
-- ORGANIZATIONS
-- ================================================================
create table organizations (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  plan          text not null default 'free' check (plan in ('free', 'starter', 'pro', 'enterprise')),
  timezone      text not null default 'Africa/Lagos',
  phone_provider text not null default 'twilio' check (phone_provider in ('twilio', 'africas_talking', 'vonage')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ================================================================
-- USERS
-- ================================================================
create table users (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references organizations(id) on delete cascade,
  name          text not null,
  email         text not null unique,
  role          text not null default 'member' check (role in ('owner', 'admin', 'member')),
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index idx_users_org_id on users(org_id);

-- ================================================================
-- CONTACTS
-- ================================================================
create table contacts (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references organizations(id) on delete cascade,
  name          text not null,
  phone_e164    text not null,                        -- e.g. +2348034417821
  email         text,
  tags          text[] default '{}',                  -- e.g. ['member', 'vip', 'donor']
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique(org_id, phone_e164)                          -- no duplicate numbers per org
);

create index idx_contacts_org_id on contacts(org_id);
create index idx_contacts_phone  on contacts(phone_e164);

-- ================================================================
-- EVENTS
-- ================================================================
create table events (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references organizations(id) on delete cascade,
  name          text not null,
  description   text,
  event_date    timestamptz not null,
  venue         text,
  status        text not null default 'draft' check (status in ('draft', 'active', 'paused', 'completed', 'cancelled')),
  created_by    uuid references users(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index idx_events_org_id on events(org_id);
create index idx_events_status  on events(status);

-- ================================================================
-- CALL SCRIPTS
-- (one script per event; holds the AI's talking points)
-- ================================================================
create table call_scripts (
  id                   uuid primary key default gen_random_uuid(),
  event_id             uuid not null unique references events(id) on delete cascade,
  greeting_template    text not null default 'Hello {contact_name}, this is a message from {org_name}.',
  invite_message       text not null default 'We would love to have you join us for {event_name} on {event_date} at {venue}.',
  confirmation_prompt  text not null default 'Can we count on you to be there?',
  closing_message      text not null default 'Thank you so much. We look forward to seeing you!',
  voice_id             text not null default 'en-NG-female-1',   -- maps to TTS voice
  language             text not null default 'en',
  max_call_duration_s  int  not null default 120,                 -- hang up after 2 min
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- ================================================================
-- CAMPAIGNS
-- (a campaign is one calling run tied to an event)
-- ================================================================
create table campaigns (
  id                 uuid primary key default gen_random_uuid(),
  event_id           uuid not null references events(id) on delete cascade,
  name               text not null,
  status             text not null default 'draft' check (status in ('draft', 'active', 'paused', 'completed', 'cancelled')),
  max_retries        int  not null default 3,
  call_window_start  time not null default '08:00:00',   -- don't call before this
  call_window_end    time not null default '20:00:00',   -- don't call after this
  calls_per_minute   int  not null default 10,           -- rate limit for dialer
  sms_fallback       boolean not null default true,      -- send SMS after max retries
  launched_at        timestamptz,
  completed_at       timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index idx_campaigns_event_id on campaigns(event_id);
create index idx_campaigns_status   on campaigns(status);

-- ================================================================
-- CAMPAIGN CONTACTS
-- (junction table — one row per contact per campaign)
-- tracks retry state independently for each contact
-- ================================================================
create table campaign_contacts (
  id               uuid primary key default gen_random_uuid(),
  campaign_id      uuid not null references campaigns(id) on delete cascade,
  contact_id       uuid not null references contacts(id) on delete cascade,
  attempt_count    int  not null default 0,
  status           text not null default 'pending' check (
                     status in ('pending', 'calling', 'coming', 'not_coming', 'no_answer', 'callback_requested', 'sms_sent', 'opted_out')
                   ),
  next_attempt_at  timestamptz default now(),             -- dialer checks this
  last_attempted_at timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique(campaign_id, contact_id)                         -- contact appears once per campaign
);

create index idx_cc_campaign_id      on campaign_contacts(campaign_id);
create index idx_cc_contact_id       on campaign_contacts(contact_id);
create index idx_cc_status           on campaign_contacts(status);
-- dialer query index: find who to call next
create index idx_cc_dialer           on campaign_contacts(campaign_id, status, next_attempt_at)
  where status = 'pending';

-- ================================================================
-- CALL LOGS
-- (one row per actual call attempt)
-- ================================================================
create table call_logs (
  id                    uuid primary key default gen_random_uuid(),
  campaign_contact_id   uuid not null references campaign_contacts(id) on delete cascade,
  call_sid              text unique,                      -- Twilio/AT call ID
  direction             text not null default 'outbound',
  duration_seconds      int,
  recording_url         text,
  transcript            text,                             -- full STT transcript
  provider_status       text,                            -- raw status from Twilio etc.
  called_at             timestamptz not null default now(),
  ended_at              timestamptz
);

create index idx_call_logs_campaign_contact_id on call_logs(campaign_contact_id);
create index idx_call_logs_called_at           on call_logs(called_at desc);

-- ================================================================
-- CALL OUTCOMES
-- (AI classification result for each call)
-- ================================================================
create table call_outcomes (
  id              uuid primary key default gen_random_uuid(),
  call_log_id     uuid not null unique references call_logs(id) on delete cascade,
  status          text not null check (
                    status in ('coming', 'not_coming', 'no_answer', 'callback_requested', 'ambiguous')
                  ),
  ai_summary      text,                                   -- e.g. "Said she'll attend with family"
  reason          text,                                   -- e.g. "Travelling that weekend"
  confidence      numeric(4,3) check (confidence between 0 and 1),  -- 0.000 to 1.000
  callback_time   timestamptz,                            -- if callback_requested
  classified_at   timestamptz not null default now()
);

create index idx_call_outcomes_call_log_id on call_outcomes(call_log_id);
create index idx_call_outcomes_status      on call_outcomes(status);

-- ================================================================
-- SMS LOGS
-- (track fallback SMS messages)
-- ================================================================
create table sms_logs (
  id                   uuid primary key default gen_random_uuid(),
  campaign_contact_id  uuid not null references campaign_contacts(id) on delete cascade,
  message_sid          text unique,                       -- provider message ID
  body                 text not null,
  status               text not null default 'sent' check (status in ('sent', 'delivered', 'failed', 'replied')),
  sent_at              timestamptz not null default now(),
  delivered_at         timestamptz
);

create index idx_sms_logs_campaign_contact_id on sms_logs(campaign_contact_id);

-- ================================================================
-- UPDATED_AT TRIGGER
-- keeps updated_at current automatically on every table that has it
-- ================================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_organizations_updated_at
  before update on organizations
  for each row execute function set_updated_at();

create trigger trg_users_updated_at
  before update on users
  for each row execute function set_updated_at();

create trigger trg_contacts_updated_at
  before update on contacts
  for each row execute function set_updated_at();

create trigger trg_events_updated_at
  before update on events
  for each row execute function set_updated_at();

create trigger trg_call_scripts_updated_at
  before update on call_scripts
  for each row execute function set_updated_at();

create trigger trg_campaigns_updated_at
  before update on campaigns
  for each row execute function set_updated_at();

create trigger trg_campaign_contacts_updated_at
  before update on campaign_contacts
  for each row execute function set_updated_at();

-- ================================================================
-- ROW LEVEL SECURITY (RLS)
-- locks every table to the org the logged-in user belongs to
-- ================================================================
alter table organizations      enable row level security;
alter table users              enable row level security;
alter table contacts           enable row level security;
alter table events             enable row level security;
alter table call_scripts       enable row level security;
alter table campaigns          enable row level security;
alter table campaign_contacts  enable row level security;
alter table call_logs          enable row level security;
alter table call_outcomes      enable row level security;
alter table sms_logs           enable row level security;

-- helper: returns the org_id of the currently authenticated user
create or replace function auth_org_id()
returns uuid as $$
  select org_id from users where id = auth.uid()
$$ language sql security definer stable;

-- organizations: only see your own org
create policy "org members see own org"
  on organizations for all
  using (id = auth_org_id());

-- users: only see users in your org
create policy "org members see own users"
  on users for all
  using (org_id = auth_org_id());

-- contacts
create policy "org members see own contacts"
  on contacts for all
  using (org_id = auth_org_id());

-- events
create policy "org members see own events"
  on events for all
  using (org_id = auth_org_id());

-- call_scripts (join through events)
create policy "org members see own scripts"
  on call_scripts for all
  using (event_id in (select id from events where org_id = auth_org_id()));

-- campaigns
create policy "org members see own campaigns"
  on campaigns for all
  using (event_id in (select id from events where org_id = auth_org_id()));

-- campaign_contacts
create policy "org members see own campaign contacts"
  on campaign_contacts for all
  using (campaign_id in (
    select c.id from campaigns c
    join events e on e.id = c.event_id
    where e.org_id = auth_org_id()
  ));

-- call_logs
create policy "org members see own call logs"
  on call_logs for all
  using (campaign_contact_id in (
    select cc.id from campaign_contacts cc
    join campaigns c  on c.id  = cc.campaign_id
    join events e     on e.id  = c.event_id
    where e.org_id = auth_org_id()
  ));

-- call_outcomes
create policy "org members see own outcomes"
  on call_outcomes for all
  using (call_log_id in (
    select cl.id from call_logs cl
    join campaign_contacts cc on cc.id = cl.campaign_contact_id
    join campaigns c          on c.id  = cc.campaign_id
    join events e             on e.id  = c.event_id
    where e.org_id = auth_org_id()
  ));

-- sms_logs
create policy "org members see own sms logs"
  on sms_logs for all
  using (campaign_contact_id in (
    select cc.id from campaign_contacts cc
    join campaigns c on c.id = cc.campaign_id
    join events e    on e.id = c.event_id
    where e.org_id = auth_org_id()
  ));

-- ================================================================
-- USEFUL VIEWS
-- pre-built queries you'll use constantly in your dashboard
-- ================================================================

-- per-event summary (powers the KPI cards)
create or replace view event_summary as
select
  e.id            as event_id,
  e.name          as event_name,
  e.event_date,
  e.status        as event_status,
  e.org_id,
  count(distinct cc.contact_id)                                          as total_contacts,
  count(distinct cl.id)                                                  as total_calls_made,
  count(distinct cl.id) filter (where co.status = 'coming')             as coming,
  count(distinct cl.id) filter (where co.status = 'not_coming')         as not_coming,
  count(distinct cl.id) filter (where co.status = 'no_answer')          as no_answer,
  count(distinct cl.id) filter (where co.status = 'callback_requested') as callback_requested,
  round(
    count(distinct cl.id) filter (where co.status = 'coming')::numeric
    / nullif(count(distinct cl.id), 0) * 100, 1
  )                                                                      as confirmation_rate_pct
from events e
left join campaigns        ca on ca.event_id = e.id
left join campaign_contacts cc on cc.campaign_id = ca.id
left join call_logs        cl on cl.campaign_contact_id = cc.id
left join call_outcomes    co on co.call_log_id = cl.id
group by e.id, e.name, e.event_date, e.status, e.org_id;

-- dialer queue: who to call next right now
create or replace view dialer_queue as
select
  cc.id               as campaign_contact_id,
  cc.campaign_id,
  cc.contact_id,
  c.name              as contact_name,
  c.phone_e164,
  ca.event_id,
  e.name              as event_name,
  cc.attempt_count,
  ca.max_retries,
  cc.next_attempt_at
from campaign_contacts cc
join contacts  c  on c.id  = cc.contact_id
join campaigns ca on ca.id = cc.campaign_id
join events    e  on e.id  = ca.event_id
where cc.status = 'pending'
  and cc.attempt_count < ca.max_retries
  and cc.next_attempt_at <= now()
  and ca.status = 'active'
  and current_time between ca.call_window_start and ca.call_window_end
order by cc.next_attempt_at asc;

-- recent call activity (powers the activity table in the dashboard)
create or replace view recent_call_activity as
select
  cl.id               as call_log_id,
  c.name              as contact_name,
  c.phone_e164,
  c.tags,
  e.name              as event_name,
  co.status           as outcome,
  co.ai_summary,
  cl.duration_seconds,
  cl.called_at
from call_logs        cl
join campaign_contacts cc on cc.id = cl.campaign_contact_id
join contacts          c  on c.id  = cc.contact_id
join campaigns         ca on ca.id = cc.campaign_id
join events            e  on e.id  = ca.event_id
left join call_outcomes co on co.call_log_id = cl.id
order by cl.called_at desc;
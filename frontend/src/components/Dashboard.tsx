import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('All Calls');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Animate progress bars on mount
    const fills = document.querySelectorAll('.prog-fill, .event-prog-fill');
    fills.forEach(el => {
      const target = (el as HTMLElement).style.width;
      (el as HTMLElement).style.width = '0%';
      requestAnimationFrame(() => {
        setTimeout(() => { (el as HTMLElement).style.width = target; }, 100);
      });
    });
  }, []);

  const handleNavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    (e.currentTarget as HTMLElement).classList.add('active');
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="shell">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 4C6 3.2 7 2.5 7.8 3L21 10.5C21.8 11 21.8 12 21 12.5L7.8 20C7 20.5 6 19.8 6 19V4Z" fill="white" opacity="0.95"/>
              <path d="M3 8C3 6.9 4.2 6.3 5 7L10 10.5L5 14C4.2 14.7 3 14.1 3 13V8Z" fill="white" opacity="0.5"/>
            </svg>
          </div>
          <div className="logo-text">Dial<span>Surge</span></div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Main</div>

          <a className="nav-item active" href="#" onClick={handleNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            Dashboard
          </a>

          <a className="nav-item" href="#" onClick={handleNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Events
            <span className="nav-badge">3</span>
          </a>

          <a className="nav-item" href="#" onClick={handleNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Contacts
          </a>

          <a className="nav-item" href="#" onClick={handleNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.69 19a19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 5.27 5.27l1.28-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call Logs
          </a>

          <div className="nav-section-label">Analytics</div>

          <a className="nav-item" href="#" onClick={handleNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v10l4.5 4.5"/><circle cx="19" cy="5" r="3"/>
            </svg>
            AI Reports
          </a>

          <div className="nav-section-label">Account</div>

          <a className="nav-item" href="#" onClick={handleNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
            </svg>
            Settings
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="workspace-card">
            <div className="ws-avatar">GBC</div>
            <div className="ws-info">
              <div className="ws-name">Grace Bible Church</div>
              <div className="ws-plan">Free Plan · 3/5 Events</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <button className="btn-upgrade">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Upgrade Plan
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main">
        {/* HEADER */}
        <header className="header">
          <div className="header-search">
            <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              className="search-input" 
              type="text" 
              placeholder="Search contacts, events, call logs…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="kbd-hint">⌘K</span>
          </div>

          <div className="header-right">
            <button className="icon-btn" title="Help">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </button>
            <button className="icon-btn" title="Notifications">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div className="notif-dot"></div>
            </button>

            <div className="user-chip">
              <div className="user-avatar">PJ</div>
              <span className="user-name">Pastor James</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="content">
          {/* 1. WELCOME BAR */}
          <div className="welcome-bar">
            <div className="welcome-text">
              <div className="welcome-title">Good morning, Pastor James 👋</div>
              <div className="welcome-sub">You have <strong>3 active events</strong> and <strong>412 calls</strong> scheduled for today. Let's make an impact.</div>
            </div>
            <div className="welcome-actions">
              <button className="btn-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Import Contacts
              </button>
              <button className="btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                New Event
              </button>
            </div>
          </div>

          {/* 2. KPI ROW */}
          <div className="kpi-row">
            {/* Total Contacts */}
            <div className="kpi-card blue">
              <div className="kpi-header">
                <span className="kpi-label">Total Contacts</span>
                <div className="kpi-icon blue">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
              </div>
              <div className="kpi-value">2,847</div>
              <div className="kpi-meta">
                <span className="delta up">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
                  +124
                </span>
                <span className="kpi-sub">this week</span>
              </div>
            </div>

            {/* Calls Made Today */}
            <div className="kpi-card teal">
              <div className="kpi-header">
                <span className="kpi-label">Calls Made Today</span>
                <div className="kpi-icon teal">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.02-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
              </div>
              <div className="kpi-value">412</div>
              <div className="prog-wrap">
                <div className="prog-labels"><span>of <strong>850</strong> scheduled</span><span><strong>48.5%</strong></span></div>
                <div className="prog-bar"><div className="prog-fill" style={{width: '48.5%'}}></div></div>
              </div>
            </div>

            {/* Confirmed */}
            <div className="kpi-card green">
              <div className="kpi-header">
                <span className="kpi-label">Confirmed Attending</span>
                <div className="kpi-icon green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </div>
              <div className="kpi-value">318</div>
              <div className="kpi-meta">
                <span className="delta up">37.4%</span>
                <span className="kpi-sub">response rate</span>
              </div>
            </div>

            {/* No Answer / Declined */}
            <div className="kpi-card amber">
              <div className="kpi-header">
                <span className="kpi-label">Declined &amp; No Answer</span>
                <div className="kpi-icon amber">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 5a10.94 10.94 0 0 0-2.06 2.89 11 11 0 0 0 4.31 5.96"/>
                    <path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 0 3.29 6.61"/><path d="M10.71 18.95A16 16 0 0 0 22.56 15"/>
                  </svg>
                </div>
              </div>
              <div className="kpi-value" style={{fontSize: '22px', marginBottom: '10px'}}>94 · 440</div>
              <div className="kpi-split">
                <div className="split-bar-wrap">
                  <div className="split-seg" style={{width: '17.6%', background: '#DC2626', borderRadius: '100px 0 0 100px'}}></div>
                  <div className="split-seg" style={{width: '82.4%', background: '#E2E8F0', borderRadius: '0 100px 100px 0'}}></div>
                </div>
                <div className="kpi-split-labels">
                  <div className="split-label"><div className="split-dot" style={{background: '#DC2626'}}></div>Declined</div>
                  <div className="split-label"><div className="split-dot" style={{background: '#CBD5E1'}}></div>No ans.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3+5. EVENTS + INSIGHTS (2-col grid) */}
          <div className="grid-main">
            {/* LEFT: Events */}
            <div>
              <div className="section-header">
                <span className="section-title">Your Active Events</span>
                <a className="section-link" href="#">View All →</a>
              </div>

              <div className="events-grid">
                {/* Event 1 */}
                <div className="event-card">
                  <span className="event-status active">Active</span>
                  <div className="event-icon" style={{background: '#EEF4FF'}}>🙏</div>
                  <div className="event-name">Easter Sunday Service</div>
                  <div className="event-meta">
                    <div className="event-detail">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Sun, Apr 20, 2025 · 9:00 AM
                    </div>
                    <div className="event-detail">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Grace Bible Church, Abuja
                    </div>
                  </div>
                  <div className="event-contact-badge">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                    850 contacts
                  </div>
                  <div className="event-prog-wrap">
                    <div className="event-prog-labels"><span>Calls made</span><span>48%</span></div>
                    <div className="event-prog-bar"><div className="event-prog-fill" style={{width: '48%'}}></div></div>
                  </div>
                  <div className="event-stats">
                    <span className="stat-chip coming">✅ 318 Coming</span>
                    <span className="stat-chip notcoming">❌ 94</span>
                    <span className="stat-chip noanswer">📵 440</span>
                  </div>
                  <div className="event-actions">
                    <button className="btn-outline">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Manage
                    </button>
                    <button className="btn-filled">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07"/><path d="M1 1l22 22"/></svg>
                      Start Calling
                    </button>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="event-card">
                  <span className="event-status paused">Paused</span>
                  <div className="event-icon" style={{background: '#FFFBEB'}}>⚡</div>
                  <div className="event-name">Youth Conference 2025</div>
                  <div className="event-meta">
                    <div className="event-detail">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Sat, May 10, 2025 · 10:00 AM
                    </div>
                    <div className="event-detail">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Youth Center, Garki II
                    </div>
                  </div>
                  <div className="event-contact-badge">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                    560 contacts
                  </div>
                  <div className="event-prog-wrap">
                    <div className="event-prog-labels"><span>Calls made</span><span>39%</span></div>
                    <div className="event-prog-bar"><div className="event-prog-fill" style={{width: '39%'}}></div></div>
                  </div>
                  <div className="event-stats">
                    <span className="stat-chip coming">✅ 142 Coming</span>
                    <span className="stat-chip notcoming">❌ 78</span>
                    <span className="stat-chip noanswer">📵 340</span>
                  </div>
                  <div className="event-actions">
                    <button className="btn-outline">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Manage
                    </button>
                    <button className="btn-filled">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      Resume
                    </button>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="event-card">
                  <span className="event-status active">Active</span>
                  <div className="event-icon" style={{background: '#F0FDF4'}}>🎗️</div>
                  <div className="event-name">Annual Fundraiser Gala</div>
                  <div className="event-meta">
                    <div className="event-detail">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Fri, Jun 6, 2025 · 6:30 PM
                    </div>
                    <div className="event-detail">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Transcorp Hilton, Maitama
                    </div>
                  </div>
                  <div className="event-contact-badge">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                    320 contacts
                  </div>
                  <div className="event-prog-wrap">
                    <div className="event-prog-labels"><span>Calls made</span><span>22%</span></div>
                    <div className="event-prog-bar"><div className="event-prog-fill" style={{width: '22%'}}></div></div>
                  </div>
                  <div className="event-stats">
                    <span className="stat-chip coming">✅ 49 Coming</span>
                    <span className="stat-chip notcoming">❌ 22</span>
                    <span className="stat-chip noanswer">📵 249</span>
                  </div>
                  <div className="event-actions">
                    <button className="btn-outline">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Manage
                    </button>
                    <button className="btn-filled">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07"/></svg>
                      Start Calling
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: AI Insights Panel */}
            <div className="insights-panel">
              <div className="insights-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="insights-title">AI Insights</span>
                <span className="insight-badge">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                  Live
                </span>
              </div>

              {/* Insight 1 */}
              <div className="insight-card">
                <div className="insight-card-header">
                  <div className="insight-dot" style={{background: '#0066FF'}}></div>
                  <div className="insight-text">
                    <strong>Best call window today:</strong> Contacts are most responsive between <strong>5:00 PM – 7:00 PM</strong> based on 30-day patterns.
                  </div>
                </div>
                <span className="insight-tag" style={{background: '#EEF4FF', color: '#0066FF'}}>
                  ⏰ Timing
                </span>
              </div>

              {/* Insight 2 */}
              <div className="insight-card">
                <div className="insight-card-header">
                  <div className="insight-dot" style={{background: '#D97706'}}></div>
                  <div className="insight-text">
                    <strong>23 contacts</strong> have been unreached after 3 call attempts — consider an SMS fallback to boost reach.
                  </div>
                </div>
                <span className="insight-tag" style={{background: '#FFFBEB', color: '#D97706'}}>
                  📱 SMS Fallback
                </span>
              </div>

              {/* Insight 3 */}
              <div className="insight-card">
                <div className="insight-card-header">
                  <div className="insight-dot" style={{background: '#16A34A'}}></div>
                  <div className="insight-text">
                    <strong>Easter Sunday</strong> has your highest confirmation rate at <strong>48%</strong> — above your 37% average.
                  </div>
                </div>
                <span className="insight-tag" style={{background: '#F0FDF4', color: '#16A34A'}}>
                  📈 Top Event
                </span>
              </div>

              {/* Suggested Action */}
              <div className="cta-insight">
                <div className="cta-insight-label">✦ Suggested Next Action</div>
                <div className="cta-insight-text">
                  Resume calling for <strong>Youth Conference</strong> — <strong>340 contacts</strong> are still unreached and event is 30 days away.
                </div>
                <button className="btn-teal">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Resume Campaign
                </button>
              </div>

              {/* Mini stat */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '7px', paddingTop: '4px', borderTop: '1px solid var(--gray-100)', marginTop: '2px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: '11.5px', color: 'var(--gray-400)', fontWeight: '500'}}>AI Calls Success Rate</span>
                  <span style={{fontSize: '13px', fontWeight: '700', color: 'var(--teal)'}}>73.2%</span>
                </div>
                <div className="prog-bar"><div className="prog-fill" style={{width: '73.2%', background: 'linear-gradient(90deg,var(--teal),#0EB5B2)'}}></div></div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span style={{fontSize: '11px', color: 'var(--gray-400)'}}>Avg call duration: 1m 42s</span>
                  <span style={{fontSize: '11px', color: 'var(--gray-400)'}}>↑ vs last week</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. ACTIVITY TABLE */}
          <div className="table-card">
            <div className="table-header-row">
              <div className="table-title-group">
                <span className="section-title">Recent Call Activity</span>
                <div className="live-chip">
                  <div className="live-dot"></div>
                  Live
                </div>
              </div>
              <div className="table-filters">
                <div className={`filter-chip ${activeFilter === 'All Calls' ? 'active' : ''}`} onClick={() => handleFilterClick('All Calls')}>All Calls</div>
                <div className={`filter-chip ${activeFilter === 'Coming' ? 'active' : ''}`} onClick={() => handleFilterClick('Coming')}>Coming</div>
                <div className={`filter-chip ${activeFilter === 'Not Coming' ? 'active' : ''}`} onClick={() => handleFilterClick('Not Coming')}>Not Coming</div>
                <div className={`filter-chip ${activeFilter === 'No Answer' ? 'active' : ''}`} onClick={() => handleFilterClick('No Answer')}>No Answer</div>
                <div className="filter-chip">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/></svg>
                  Filter
                </div>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Phone</th>
                  <th>Event</th>
                  <th>Status</th>
                  <th>Duration</th>
                  <th>AI Summary</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="contact-cell">
                      <div className="contact-avatar" style={{background: 'linear-gradient(135deg,#6366F1,#8B5CF6)'}}>AO</div>
                      <div>
                        <div className="contact-name">Adaeze Okonkwo</div>
                        <div className="contact-phone">Member · 3 yrs</div>
                      </div>
                    </div>
                  </td>
                  <td className="phone-cell">+234 803 441 7821</td>
                  <td><span className="event-pill">Easter Sunday</span></td>
                  <td><span className="status-pill coming"><div className="status-dot"></div>Coming</span></td>
                  <td className="duration-cell">2m 14s</td>
                  <td className="summary-cell">"Said she'll attend with her husband and kids"</td>
                  <td className="ts-cell">9:42 AM</td>
                </tr>
                <tr>
                  <td>
                    <div className="contact-cell">
                      <div className="contact-avatar" style={{background: 'linear-gradient(135deg,#0D9488,#06B6D4)'}}>BN</div>
                      <div>
                        <div className="contact-name">Biodun Nwosu</div>
                        <div className="contact-phone">New Member</div>
                      </div>
                    </div>
                  </td>
                  <td className="phone-cell">+234 815 220 3345</td>
                  <td><span className="event-pill">Youth Conf.</span></td>
                  <td><span className="status-pill calling"><div className="status-dot"></div>In Progress</span></td>
                  <td className="duration-cell">0m 48s</td>
                  <td className="summary-cell">Call ongoing — AI agent engaged</td>
                  <td className="ts-cell">9:48 AM</td>
                </tr>
                <tr>
                  <td>
                    <div className="contact-cell">
                      <div className="contact-avatar" style={{background: 'linear-gradient(135deg,#DC2626,#F97316)'}}>EI</div>
                      <div>
                        <div className="contact-name">Emeka Ihejirika</div>
                        <div className="contact-phone">Donor · VIP</div>
                      </div>
                    </div>
                  </td>
                  <td className="phone-cell">+234 902 671 0034</td>
                  <td><span className="event-pill">Fundraiser Gala</span></td>
                  <td><span className="status-pill not-coming"><div className="status-dot"></div>Not Coming</span></td>
                  <td className="duration-cell">1m 02s</td>
                  <td className="summary-cell">"Travelling abroad that weekend, sends regards"</td>
                  <td className="ts-cell">9:31 AM</td>
                </tr>
                <tr>
                  <td>
                    <div className="contact-cell">
                      <div className="contact-avatar" style={{background: 'linear-gradient(135deg,#0066FF,#0EB5B2)'}}>FD</div>
                      <div>
                        <div className="contact-name">Fatima Danjuma</div>
                        <div className="contact-phone">Member · 1 yr</div>
                      </div>
                    </div>
                  </td>
                  <td className="phone-cell">+234 708 119 5560</td>
                  <td><span className="event-pill">Easter Sunday</span></td>
                  <td><span className="status-pill coming"><div className="status-dot"></div>Coming</span></td>
                  <td className="duration-cell">1m 47s</td>
                  <td className="summary-cell">"Confirmed, also inviting her sister to join"</td>
                  <td className="ts-cell">9:25 AM</td>
                </tr>
                <tr>
                  <td>
                    <div className="contact-cell">
                      <div className="contact-avatar" style={{background: 'linear-gradient(135deg,#7C3AED,#A855F7)'}}>CA</div>
                      <div>
                        <div className="contact-name">Chidi Anozie</div>
                        <div className="contact-phone">Volunteer</div>
                      </div>
                    </div>
                  </td>
                  <td className="phone-cell">+234 812 554 8890</td>
                  <td><span className="event-pill">Youth Conf.</span></td>
                  <td><span className="status-pill no-answer"><div className="status-dot"></div>No Answer</span></td>
                  <td className="duration-cell">—</td>
                  <td className="summary-cell">Voicemail left, retry scheduled 5 PM</td>
                  <td className="ts-cell">9:18 AM</td>
                </tr>
                <tr>
                  <td>
                    <div className="contact-cell">
                      <div className="contact-avatar" style={{background: 'linear-gradient(135deg,#D97706,#F59E0B)'}}>RO</div>
                      <div>
                        <div className="contact-name">Ruth Oyelaran</div>
                        <div className="contact-phone">Member · 5 yrs</div>
                      </div>
                    </div>
                  </td>
                  <td className="phone-cell">+234 901 337 2241</td>
                  <td><span className="event-pill">Easter Sunday</span></td>
                  <td><span className="status-pill coming"><div className="status-dot"></div>Coming</span></td>
                  <td className="duration-cell">2m 31s</td>
                  <td className="summary-cell">"Very excited, will lead the choir that morning"</td>
                  <td className="ts-cell">9:10 AM</td>
                </tr>
                <tr>
                  <td>
                    <div className="contact-cell">
                      <div className="contact-avatar" style={{background: 'linear-gradient(135deg,#16A34A,#0D9488)'}}>KM</div>
                      <div>
                        <div className="contact-name">Kelechi Maduka</div>
                        <div className="contact-phone">Elder</div>
                      </div>
                    </div>
                  </td>
                  <td className="phone-cell">+234 706 882 1134</td>
                  <td><span className="event-pill">Fundraiser Gala</span></td>
                  <td><span className="status-pill coming"><div className="status-dot"></div>Coming</span></td>
                  <td className="duration-cell">3m 08s</td>
                  <td className="summary-cell">"Pledged ₦250k, wants table for 10 guests"</td>
                  <td className="ts-cell">8:54 AM</td>
                </tr>
                <tr>
                  <td>
                    <div className="contact-cell">
                      <div className="contact-avatar" style={{background: 'linear-gradient(135deg,#475569,#64748B)'}}>LU</div>
                      <div>
                        <div className="contact-name">Lara Uzodimma</div>
                        <div className="contact-phone">New Member</div>
                      </div>
                    </div>
                  </td>
                  <td className="phone-cell">+234 813 990 4478</td>
                  <td><span className="event-pill">Easter Sunday</span></td>
                  <td><span className="status-pill no-answer"><div className="status-dot"></div>No Answer</span></td>
                  <td className="duration-cell">—</td>
                  <td className="summary-cell">No response, 2nd attempt queued</td>
                  <td className="ts-cell">8:41 AM</td>
                </tr>
              </tbody>
            </table>

            <div className="table-footer">
              <span className="table-count">Showing 8 of 412 calls today</span>
              <a className="section-link" href="#">View Full Log →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

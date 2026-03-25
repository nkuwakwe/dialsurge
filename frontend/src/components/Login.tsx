import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Phone, Activity, Zap, BarChart3, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import type { FormState, FormErrors } from '../types/auth';
                                                                                                                                                                                                                                                                                                                    
const Login = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific errors when user starts typing
    if (fieldErrors[name as keyof FormErrors]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Clear general error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errors: FormErrors = {};

    if (name === 'email' && value && !validateEmail(value)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (name === 'password' && value && !validatePassword(value)) {
      errors.password = 'Password must be at least 8 characters.';
    }

    setFieldErrors(prev => ({ ...prev, ...errors }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: FormErrors = {};

    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    await login(formData);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="left">
        {/* Animated Orbs */}
        <div className="orb-1"></div>
        <div className="orb-2"></div>
        <div className="orb-3"></div>

        {/* SVG illustration layer */}
        <svg className="left-illustration" viewBox="0 0 720 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {/* Grid dots */}
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)"/>
            </pattern>
            <radialGradient id="node-glow-blue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="node-glow-teal" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0EB5B2" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#0EB5B2" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="node-glow-purple" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
            </radialGradient>
            <filter id="blur-soft">
              <feGaussianBlur stdDeviation="3"/>
            </filter>
          </defs>
          <rect width="720" height="900" fill="url(#dots)"/>

          {/* Neural net lines */}
          <g opacity="0.12" stroke="#0066FF" strokeWidth="0.8">
            <line x1="120" y1="200" x2="280" y2="300"/>
            <line x1="280" y1="300" x2="440" y2="220"/>
            <line x1="440" y1="220" x2="580" y2="310"/>
            <line x1="280" y1="300" x2="320" y2="440"/>
            <line x1="440" y1="220" x2="400" y2="380"/>
            <line x1="320" y1="440" x2="400" y2="380"/>
            <line x1="400" y1="380" x2="520" y2="460"/>
            <line x1="160" y1="500" x2="320" y2="440"/>
            <line x1="520" y1="460" x2="620" y2="400"/>
            <line x1="200" y1="650" x2="360" y2="580"/>
            <line x1="360" y1="580" x2="520" y2="460"/>
            <line x1="360" y1="580" x2="400" y2="700"/>
            <line x1="100" y1="350" x2="160" y2="500"/>
            <line x1="580" y1="310" x2="620" y2="400"/>
            <line x1="560" y1="600" x2="520" y2="460"/>
          </g>

          {/* Neural nodes */}
          <g>
            <circle cx="120" cy="200" r="28" fill="url(#node-glow-blue)"/>
            <circle cx="120" cy="200" r="5" fill="#0066FF" opacity="0.7"/>
            <circle cx="280" cy="300" r="36" fill="url(#node-glow-teal)"/>
            <circle cx="280" cy="300" r="7" fill="#0EB5B2" opacity="0.85"/>
            <circle cx="440" cy="220" r="24" fill="url(#node-glow-purple)"/>
            <circle cx="440" cy="220" r="5" fill="#8B5CF6" opacity="0.7"/>
            <circle cx="580" cy="310" r="20" fill="url(#node-glow-blue)"/>
            <circle cx="580" cy="310" r="4" fill="#0066FF" opacity="0.65"/>
            <circle cx="320" cy="440" r="20" fill="url(#node-glow-blue)"/>
            <circle cx="320" cy="440" r="4" fill="#0066FF" opacity="0.65"/>
            <circle cx="400" cy="380" r="32" fill="url(#node-glow-teal)"/>
            <circle cx="400" cy="380" r="6" fill="#0EB5B2" opacity="0.8"/>
            <circle cx="160" cy="500" r="18" fill="url(#node-glow-purple)"/>
            <circle cx="160" cy="500" r="4" fill="#8B5CF6" opacity="0.6"/>
            <circle cx="520" cy="460" r="28" fill="url(#node-glow-blue)"/>
            <circle cx="520" cy="460" r="5.5" fill="#0066FF" opacity="0.75"/>
            <circle cx="620" cy="400" r="16" fill="url(#node-glow-teal)"/>
            <circle cx="620" cy="400" r="3.5" fill="#0EB5B2" opacity="0.6"/>
            <circle cx="360" cy="580" r="22" fill="url(#node-glow-purple)"/>
            <circle cx="360" cy="580" r="4.5" fill="#8B5CF6" opacity="0.7"/>
            <circle cx="200" cy="650" r="18" fill="url(#node-glow-blue)"/>
            <circle cx="200" cy="650" r="4" fill="#0066FF" opacity="0.6"/>
            <circle cx="400" cy="700" r="20" fill="url(#node-glow-teal)"/>
            <circle cx="400" cy="700" r="4.5" fill="#0EB5B2" opacity="0.65"/>
            <circle cx="560" cy="600" r="24" fill="url(#node-glow-purple)"/>
            <circle cx="560" cy="600" r="5" fill="#8B5CF6" opacity="0.7"/>
          </g>

          {/* Floating call bubble top-right */}
          <g transform="translate(520, 130)" opacity="0.55">
            <rect width="140" height="48" rx="24" fill="rgba(0,102,255,0.2)" stroke="rgba(0,102,255,0.4)" strokeWidth="1"/>
            <circle cx="24" cy="24" r="10" fill="rgba(0,102,255,0.4)"/>
            {/* phone icon in bubble */}
            <path d="M20 20 C20 18 22 17 24 18 L26 19 C27 20 27 21 26 22 C26 23 27 24 28 24 C29 24 30 25 30 26 C30 28 28 29 27 28 C23 27 21 24 20 20Z" fill="rgba(255,255,255,0.7)" stroke="none"/>
            <text x="42" y="29" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="DM Sans, sans-serif" fontWeight="500">Connecting...</text>
          </g>

          {/* Floating call bubble bottom-left */}
          <g transform="translate(60, 680)" opacity="0.45">
            <rect width="130" height="44" rx="22" fill="rgba(14,181,178,0.15)" stroke="rgba(14,181,178,0.35)" strokeWidth="1"/>
            <circle cx="22" cy="22" r="9" fill="rgba(14,181,178,0.35)"/>
            <text x="38" y="26" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontFamily="DM Sans, sans-serif" fontWeight="500">Call complete ✓</text>
          </g>

          {/* Waveform in center */}
          <g transform="translate(230, 480)" opacity="0.22">
            <rect className="wave-bar" x="0" y="10" width="5" height="20" rx="3" fill="#0066FF" style={{animationDelay:'0s'}}/>
            <rect className="wave-bar" x="9" y="5" width="5" height="30" rx="3" fill="#0066FF" style={{animationDelay:'0.1s'}}/>
            <rect className="wave-bar" x="18" y="2" width="5" height="36" rx="3" fill="#0EB5B2" style={{animationDelay:'0.2s'}}/>
            <rect className="wave-bar" x="27" y="0" width="5" height="40" rx="3" fill="#8B5CF6" style={{animationDelay:'0.3s'}}/>
            <rect className="wave-bar" x="36" y="2" width="5" height="36" rx="3" fill="#0EB5B2" style={{animationDelay:'0.4s'}}/>
            <rect className="wave-bar" x="45" y="5" width="5" height="30" rx="3" fill="#0066FF" style={{animationDelay:'0.5s'}}/>
            <rect className="wave-bar" x="54" y="8" width="5" height="24" rx="3" fill="#0066FF" style={{animationDelay:'0.6s'}}/>
            <rect className="wave-bar" x="63" y="12" width="5" height="16" rx="3" fill="#8B5CF6" style={{animationDelay:'0.7s'}}/>
            <rect className="wave-bar" x="72" y="6" width="5" height="28" rx="3" fill="#0066FF" style={{animationDelay:'0.55s'}}/>
            <rect className="wave-bar" x="81" y="3" width="5" height="34" rx="3" fill="#0EB5B2" style={{animationDelay:'0.35s'}}/>
            <rect className="wave-bar" x="90" y="1" width="5" height="38" rx="3" fill="#0066FF" style={{animationDelay:'0.15s'}}/>
            <rect className="wave-bar" x="99" y="5" width="5" height="30" rx="3" fill="#8B5CF6" style={{animationDelay:'0.45s'}}/>
            <rect className="wave-bar" x="108" y="9" width="5" height="22" rx="3" fill="#0066FF" style={{animationDelay:'0.25s'}}/>
            <rect className="wave-bar" x="117" y="4" width="5" height="32" rx="3" fill="#0EB5B2" style={{animationDelay:'0.65s'}}/>
            <rect className="wave-bar" x="126" y="7" width="5" height="26" rx="3" fill="#0066FF" style={{animationDelay:'0.05s'}}/>
          </g>
        </svg>

        {/* Content */}
        <div className="left-content">
          <div className="brand-logo">
            <div className="logo-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M8 6C8 5 9 4 10 4.5L22 11C23 11.5 23 13 22 13.5L10 20.5C9 21 8 20 8 19V6Z" fill="white" opacity="0.95"/>
                <path d="M5 10C5 8.5 6.5 8 7 9L13 14L7 19C6.5 20 5 19.5 5 18V10Z" fill="white" opacity="0.5"/>
              </svg>
            </div>
            <div className="logo-wordmark">Dial<span>Surge</span></div>
          </div>

          <p className="tagline">AI-Powered Outbound Calling at Scale</p>

          {/* Feature pills */}
          <div className="feature-pills">
            <div className="pill">
              <div className="pill-icon blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.02-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="pill-text">
                <strong>10M+ Calls Monthly</strong>
                <span>Enterprise-grade outbound dialing infrastructure</span>
              </div>
            </div>
            <div className="pill">
              <div className="pill-icon teal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0EB5B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </svg>
              </div>
              <div className="pill-text">
                <strong>AI Voice Intelligence</strong>
                <span>Real-time sentiment analysis & smart routing</span>
              </div>
            </div>
            <div className="pill">
              <div className="pill-icon purple">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <div className="pill-text">
                <strong>Live Analytics Dashboard</strong>
                <span>Conversion tracking & campaign insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[50%] min-w-[560px] flex flex-col items-center justify-center p-12 bg-[#F8FAFC] relative">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute w-[60%] h-[40%] top-[20%] right-[30%] bg-blue-500/4 rounded-full blur-3xl" />
          <div className="absolute w-[50%] h-[35%] bottom-[20%] left-[30%] bg-teal-500/3 rounded-full blur-3xl" />
        </div>

        {/* Top Branding */}
        <div className="absolute top-7 left-10 flex items-center gap-2 opacity-60">
          <div className="font-syne font-[700] text-[15px] text-[#64748B] tracking-[-0.3px]">
            DialSurge
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[18px] shadow-card p-[44px_44px_36px] w-full max-w-[440px] relative z-10 border border-[rgba(226,232,240,0.7)]">
          {/* Card Header */}
          <div className="card-header">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.25 bg-[#EEF4FF] rounded-full text-[11.5px] font-semibold text-blue-500 tracking-[0.04em] uppercase mb-4">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Secure Sign In
            </div>
            <h1 className="font-syne font-[700] text-[28px] text-[#1E293B] leading-[1.15] tracking-[-0.5px] mb-2">
              Welcome back
            </h1>
            <p className="text-[14.5px] text-[#64748B] leading-[1.5]">
              Sign in to your DialSurge workspace to continue.
            </p>
          </div>

          {/* Error Banner */}
          {(error || fieldErrors.general) && (
            <div className="flex items-start gap-2.5 p-3 bg-[#FEF2F2] border border-red-500/20 rounded-[10px] text-[13.5px] text-[#B91C1C] leading-[1.45] mb-5">
              <AlertCircle width="16" height="16" className="flex-shrink-0 mt-0.5" />
              <span>{error || fieldErrors.general}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="form" style={{marginTop: '20px'}}>
            {/* Email Field */}
            <div className={`field ${fieldErrors.email ? 'error' : ''}`}>
              <label htmlFor="email" className="field-label">
                Email or Phone Number
              </label>
              <div className="input-wrap">
                <span className="input-icon">
                  <Mail width="16" height="16" />
                </span>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="you@organization.com"
                  autoComplete="username"
                  autoFocus
                  className={`field-input ${fieldErrors.email ? 'error' : ''}`}
                />
                <div className="input-status">
                  {fieldErrors.email && (
                    <div className="status-x" style={{color: '#EF4444'}}>
                      <AlertCircle width="13" height="13" />
                    </div>
                  )}
                  {!fieldErrors.email && formData.email && validateEmail(formData.email) && (
                    <div className="status-check" style={{color: '#10B981'}}>
                      <CheckCircle width="14" height="14" />
                    </div>
                  )}
                </div>
              </div>
              {fieldErrors.email && (
                <span className="field-msg">
                  <AlertCircle width="13" height="13" />
                  <span>{fieldErrors.email}</span>
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className={`field ${fieldErrors.password ? 'error' : ''}`}>
              <label htmlFor="password" className="field-label">
                Password
              </label>
              <div className="input-wrap">
                <span className="input-icon">
                  <Lock width="16" height="16" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Your password"
                  autoComplete="current-password"
                  className={`field-input pw-input ${fieldErrors.password ? 'error' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pw-toggle"
                  title="Show/hide password"
                >
                  {showPassword ? <EyeOff width="17" height="17" /> : <Eye width="17" height="17" />}
                </button>
              </div>
              {fieldErrors.password && (
                <span className="field-msg">
                  <AlertCircle width="13" height="13" />
                  <span>{fieldErrors.password}</span>
                </span>
              )}
            </div>

            {/* Forgot Password */}
            <div className="form-row-end">
              <a href="#" className="link">Forgot your password?</a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              <span className="btn-label">Sign In to DialSurge</span>
              {isLoading && (
                <div className="spinner" />
              )}
            </button>
          </form>

          {/* Trust Signals */}
          <div className="flex items-center justify-center gap-4 mt-5 pt-5 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-1.25 text-[11.5px] text-[#94A3B8] font-medium tracking-[0.02em]">
              <Lock width="12" height="12" />
              Secure Login
            </div>
            <div className="w-0.75 h-0.75 rounded-full bg-[#E2E8F0]" />
            <div className="flex items-center gap-1.25 text-[11.5px] text-[#94A3B8] font-medium tracking-[0.02em]">
              <Shield width="12" height="12" />
              TLS 1.3 Encrypted
            </div>
            <div className="w-0.75 h-0.75 rounded-full bg-[#E2E8F0]" />
            <div className="flex items-center gap-1.25 text-[11.5px] text-[#94A3B8] font-medium tracking-[0.02em]">
              <Clock width="12" height="12" />
              SOC 2 Compliant
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-[14px] text-[#64748B]">
            Don't have an account? <a href="#" className="text-blue-500 font-medium no-underline hover:underline">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

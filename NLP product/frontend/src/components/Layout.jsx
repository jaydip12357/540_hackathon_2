import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, Home, Activity, FileText, Heart, Menu, X } from 'lucide-react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const NAV_LINKS = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/analyze', label: 'New Analysis', icon: Activity },
    { path: '/history', label: 'History', icon: FileText },
    { path: '/resources', label: 'Resources', icon: Heart },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="layout-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(15, 52, 96, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto', height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          {/* Logo Section */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent-coral), var(--accent-teal))',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Shield size={20} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: '1.2rem', lineHeight: 1.1 }}>Gaslight Guard</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>See Through the Words</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' }, gap: '8px' }}>
             {/* We'll use CSS to hide/show on mobile but inline styles are tricky for media queries here.
                 Let's create a wrapper div and use standard React patterns for responsive design */}
             <div className="desktop-nav" style={{ display: 'flex', gap: '8px' }}>
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 16px', borderRadius: 'var(--radius-input)',
                      color: isActive(link.path) ? 'var(--accent-teal)' : 'var(--text-muted)',
                      background: isActive(link.path) ? 'rgba(22, 199, 154, 0.1)' : 'transparent',
                      fontWeight: isActive(link.path) ? 600 : 500,
                      transition: 'all 0.2s',
                    }}
                  >
                    <link.icon size={18} />
                    {link.label}
                  </Link>
                ))}
             </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              background: 'none', border: 'none', color: 'var(--text-main)', 
              cursor: 'pointer', display: 'flex' 
            }}
          >
            <div style={{ display: 'none' }} className="mobile-only-icon">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '32px 24px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-card)',
        padding: '40px 24px'
      }}>
        <div style={{ 
          maxWidth: '1200px', margin: '0 auto', 
          display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between' 
        }}>
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Shield size={20} color="var(--accent-teal)" />
              <span style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: '1.2rem' }}>Gaslight Guard</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              An AI-powered digital mental health companion helping users detect hidden verbal abuse and trust their reality.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '16px', fontSize: '1rem' }}>Product</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <li><Link to="/analyze" style={{ color: 'var(--text-muted)' }}>Text Analysis</Link></li>
                <li><Link to="/resources" style={{ color: 'var(--text-muted)' }}>Resource Library</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '16px', fontSize: '1rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <li><a href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a></li>
                <li><a href="#" style={{ color: 'var(--text-muted)' }}>Terms of Service</a></li>
                <li><a href="#" style={{ color: 'var(--text-muted)' }}>Limitations</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ 
          maxWidth: '1200px', margin: '32px auto 0', paddingTop: '24px', 
          borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center',
          color: 'var(--text-muted)', fontSize: '0.8rem'
        }}>
          Built for the 540 Hackathon (2026). For educational purposes only. Does not replace professional help.
        </div>
      </footer>
      
      {/* Basic style tag for responsive hiding since we can't use full stylesheet easily here */}
      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-only-icon { display: block !important; }
        }
        @media (min-width: 768px) {
          .mobile-menu-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
}

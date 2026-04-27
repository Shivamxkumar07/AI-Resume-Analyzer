import React from 'react';
import { SignIn } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div style={styles.pageContainer}>
      
      {/* LEFT PANEL: Light & Professional (Day Theme) */}
      <div style={styles.leftPanel} className="auth-side-panel">
        <div style={styles.leftContent}>
          <Link to="/" style={styles.backLink}>
            ← Back to Home
          </Link>
          
          <div style={styles.brandGroup}>
            <h1 style={styles.brandName}>Resume<span style={{ color: '#2563eb' }}>AI</span></h1>
            <div style={styles.accentLine}></div>
          </div>

          <h2 style={styles.mainHeading}>
            Unlock your <br />
            <span style={{ color: '#0f172a' }}>Career Potential.</span>
          </h2>
          
          <p style={styles.description}>
            Log in to access your AI analysis, compare your resume against real job descriptions, and bridge your skill gaps.
          </p>

          {/* Value Props */}
          <div style={styles.valueProps}>
            <div style={styles.valueItem}>
              <span style={styles.valueIcon}>🔒</span>
              <div style={styles.valueText}>
                <strong>Secure Processing</strong>
                <p>Your data is private and encrypted.</p>
              </div>
            </div>
            <div style={styles.valueItem}>
              <span style={styles.valueIcon}>📈</span>
              <div style={styles.valueText}>
                <strong>Real-time Scoring</strong>
                <p>Get instant feedback on your ATS compatibility.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: The Login Action */}
      <div style={styles.rightPanel}>
        <div style={styles.loginCard}>
          <SignIn 
            routing="path" 
            path="/login" 
            signUpUrl="/signup"
            appearance={{
              elements: {
                rootBox: { width: '100%' },
                card: { boxShadow: 'none', border: 'none', backgroundColor: 'transparent' },
                headerTitle: { fontSize: '26px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px' },
                headerSubtitle: { color: '#64748b' },
                formButtonPrimary: { 
                  backgroundColor: '#0f172a', 
                  borderRadius: '10px', 
                  fontSize: '14px',
                  textTransform: 'none',
                  height: '45px'
                },
                footerActionLink: { color: '#2563eb', fontWeight: '700' }
              }
            }}
          />
        </div>
      </div>

    </div>
  );
};

// --- STYLES OBJECT ---
const styles = {
  pageContainer: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    overflow: 'hidden',
  },
  leftPanel: {
    flex: '1.1',
    backgroundColor: '#f8fafc',
    backgroundImage: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 8%',
    borderRight: '1px solid #e2e8f0',
  },
  leftContent: {
    maxWidth: '480px',
  },
  backLink: {
    textDecoration: 'none',
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '60px',
    display: 'inline-block',
  },
  brandGroup: {
    marginBottom: '30px',
  },
  brandName: {
    fontSize: '24px',
    fontWeight: '900',
    color: '#0f172a',
    margin: 0,
  },
  accentLine: {
    width: '35px',
    height: '4px',
    backgroundColor: '#2563eb',
    marginTop: '6px',
    borderRadius: '2px',
  },
  mainHeading: {
    fontSize: '48px',
    fontWeight: '900',
    color: '#1e293b',
    lineHeight: '1.1',
    marginBottom: '20px',
    letterSpacing: '-1.5px',
  },
  description: {
    fontSize: '17px',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '40px',
  },
  valueProps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  valueItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  },
  valueIcon: {
    fontSize: '22px',
    marginTop: '2px',
  },
  valueText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    fontSize: '14px',
    color: '#475569',
    '& strong': { color: '#0f172a', fontWeight: '700' },
    '& p': { margin: 0, color: '#64748b' }
  },
  rightPanel: {
    flex: '1',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  loginCard: {
    width: '100%',
    maxWidth: '420px',
  }
};

// --- RESPONSIVE CSS ---
if (typeof document !== 'undefined') {
  const style = document.createElement("style");
  style.innerHTML = `
    @media (max-width: 1024px) {
      .auth-side-panel { display: none !important; }
    }
  `;
  document.head.appendChild(style);
}

export default Login;
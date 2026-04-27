import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.pageContainer}>
      
      {/* Background Decorative Glows */}
      <div style={styles.glowTop}></div>
      <div style={styles.glowBottom}></div>

      {/* 1. HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.announcement}>
            <span style={styles.newBadge}>AI POWERED</span>
            <span style={styles.announcementText}>The ultimate tool for modern job seekers</span>
          </div>
          
          <h1 style={styles.mainTitle}>
            Beat the ATS and land your <br />
            <span style={styles.gradientText}>Dream Tech Job.</span>
          </h1>
          
          <p style={styles.description}>
            Stop guessing why you aren't getting interviews. Our AI scans your resume against thousands of real-world job descriptions, calculates your ATS score, and tells you exactly which skills you're missing.
          </p>
          
          <div style={styles.ctaGroup}>
            <Link to="/upload" style={{ textDecoration: 'none' }}>
              <button style={styles.primaryBtn}>
                Analyze Your Resume <span style={styles.arrow}>→</span>
              </button>
            </Link>
            <p style={styles.trustText}>Free to use • PDF format supported • Instant results</p>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section style={styles.features}>
        <div style={styles.featureGrid}>
          
          <div className="feature-card" style={styles.featureCard}>
            <div style={styles.iconBox}>📊</div>
            <h4 style={styles.cardTitle}>ATS Scoring</h4>
            <p style={styles.cardDesc}>
              Get an instant compatibility score based on the exact algorithms used by Fortune 500 recruiters.
            </p>
          </div>

          <div className="feature-card" style={styles.featureCard}>
            <div style={styles.iconBox}>🔍</div>
            <h4 style={styles.cardTitle}>Skill Gap Analysis</h4>
            <p style={styles.cardDesc}>
              Identify missing keywords and technical requirements holding your resume back.
            </p>
          </div>

          <div className="feature-card" style={styles.featureCard}>
            <div style={styles.iconBox}>🎯</div>
            <h4 style={styles.cardTitle}>Smart Job Matching</h4>
            <p style={styles.cardDesc}>
              Automatically match your optimized profile with live MERN, ML, and Software Engineering roles.
            </p>
          </div>

        </div>
      </section>

      {/* 3. BOTTOM CTA */}
      <section style={styles.bottomCta}>
        <div style={styles.ctaCard}>
          <h2 style={styles.ctaTitle}>Ready to optimize your career?</h2>
          <p style={styles.ctaSubtitle}>Join thousands of developers who upgraded their resumes with AI.</p>
          <Link to="/upload" style={{ textDecoration: 'none' }}>
            <button style={styles.secondaryBtn}>Get Started Now</button>
          </Link>
        </div>
      </section>

    </div>
  );
};

// --- STYLES OBJECT ---
const styles = {
  pageContainer: {
    minHeight: 'calc(100dvh - 70px)', // <-- FIXED: Dynamic Viewport Height
    backgroundColor: '#020617', // Dark slate background matching the app
    fontFamily: "'Inter', sans-serif",
    color: '#f8fafc',
    position: 'relative',
    overflow: 'hidden',
  },
  glowTop: {
    position: 'absolute',
    top: '-20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(2,6,23,0) 70%)',
    zIndex: 0,
    pointerEvents: 'none',
  },
  glowBottom: {
    position: 'absolute',
    bottom: '-20%',
    right: '-10%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(2,6,23,0) 70%)',
    zIndex: 0,
    pointerEvents: 'none',
  },
  hero: {
    padding: '100px 5% 60px 5%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },
  heroContent: { 
    maxWidth: '900px', 
    margin: '0 auto',
    animation: 'fadeUp 0.8s ease-out'
  },
  announcement: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 16px',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '100px',
    marginBottom: '30px',
    border: '1px solid rgba(51, 65, 85, 0.8)',
  },
  newBadge: {
    backgroundColor: '#2563eb',
    color: 'white',
    fontSize: '11px',
    fontWeight: '800',
    padding: '4px 10px',
    borderRadius: '12px',
    marginRight: '12px',
    letterSpacing: '0.5px',
  },
  announcementText: { 
    fontSize: '14px', 
    color: '#94a3b8', 
    fontWeight: '500' 
  },
  mainTitle: {
    fontSize: '68px',
    fontWeight: '900',
    lineHeight: '1.1',
    letterSpacing: '-2px',
    marginBottom: '24px',
    color: '#ffffff',
  },
  gradientText: {
    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  description: {
    fontSize: '20px',
    color: '#94a3b8',
    lineHeight: '1.6',
    maxWidth: '750px',
    margin: '0 auto 40px auto',
  },
  ctaGroup: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    gap: '15px' 
  },
  primaryBtn: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '18px 40px',
    borderRadius: '14px',
    fontSize: '18px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  arrow: {
    fontSize: '20px',
    transition: 'transform 0.2s ease',
  },
  trustText: { 
    fontSize: '14px', 
    color: '#475569',
    fontWeight: '500'
  },
  features: { 
    padding: '40px 5% 80px 5%', 
    position: 'relative',
    zIndex: 1,
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  featureCard: {
    backgroundColor: '#0f172a',
    padding: '40px 30px',
    borderRadius: '24px',
    border: '1px solid #1e293b',
    textAlign: 'left',
    transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
  },
  iconBox: { 
    fontSize: '44px', 
    marginBottom: '20px',
    display: 'inline-block',
    padding: '15px',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '16px',
    border: '1px solid #334155'
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '12px'
  },
  cardDesc: {
    fontSize: '16px',
    color: '#94a3b8',
    lineHeight: '1.6'
  },
  bottomCta: {
    padding: '40px 5% 100px 5%',
    position: 'relative',
    zIndex: 1,
  },
  ctaCard: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    border: '1px solid rgba(37, 99, 235, 0.2)',
    padding: '60px 40px',
    borderRadius: '30px',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: '15px'
  },
  ctaSubtitle: {
    fontSize: '18px',
    color: '#94a3b8',
    marginBottom: '35px'
  },
  secondaryBtn: {
    backgroundColor: '#ffffff',
    color: '#020617',
    padding: '16px 36px',
    borderRadius: '12px',
    fontSize: '17px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }
};

// --- CSS ANIMATIONS ---
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .feature-card:hover {
      transform: translateY(-8px);
      border-color: #3b82f6;
      box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.15);
    }
    button:hover span {
      transform: translateX(4px);
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Home;
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Dashboard = ({ data }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (!data) return;
    
    let start = 0;
    const target = data.atsScore;
    const duration = 1200; 
    const increment = target / (duration / 16); 

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setAnimatedScore(target);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [data]);

  if (!data) {
    return <Navigate to="/upload" />;
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#22c55e'; 
    if (score >= 60) return '#eab308'; 
    return '#ef4444'; 
  };

  const currentColor = getScoreColor(data.atsScore);

  // --- NEW: Download PDF Function ---
  const handleDownload = () => {
    window.print(); // Triggers the browser's native "Save as PDF" dialog
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>AI Analysis Results</h1>
        <p style={styles.subtitle}>File: {data.fileName}</p>
      </div>

      <div style={styles.cardsContainer}>
        
        {/* ATS SCORE CARD */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>ATS Compatibility</h3>
          <div style={{
            ...styles.scoreCircleOuter,
            background: `conic-gradient(${currentColor} ${animatedScore}%, #334155 ${animatedScore}%)`
          }}>
            <div style={styles.scoreCircleInner}>
              <span style={{...styles.scoreText, color: currentColor}}>
                {animatedScore}%
              </span>
            </div>
          </div>
          <p style={styles.scoreStatus}>
            {data.atsScore >= 80 ? 'Excellent Match 🚀' : data.atsScore >= 60 ? 'Good Potential 👍' : 'Needs Improvement ⚠️'}
          </p>
        </div>

        {/* FOUND SKILLS CARD */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Skills Identified</h3>
          <div style={styles.tagsContainer}>
            {data.foundSkills.map((skill, index) => (
              <span key={index} style={styles.foundTag}>{skill}</span>
            ))}
          </div>
        </div>

        {/* MISSING SKILLS CARD */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Critical Skill Gaps</h3>
          <div style={styles.tagsContainer}>
            {data.missingSkills.map((skill, index) => (
              <span key={index} style={styles.missingTag}>{skill}</span>
            ))}
          </div>
        </div>

      </div>

      <div style={styles.actionSection}>
        <h2 style={styles.actionTitle}>Ready to put these skills to work?</h2>
        <p style={styles.actionSubtitle}>
          We found jobs that perfectly match your current resume profile.
        </p>
        
        {/* NEW: Button Group Container */}
        <div style={styles.buttonGroup}>
          <Link to="/jobs" style={{ textDecoration: 'none' }}>
            <button style={styles.jobsBtn}>
              View Job Recommendations 🚀
            </button>
          </Link>
          
          <button onClick={handleDownload} style={styles.downloadBtn}>
            📥 Download Report
          </button>
        </div>
      </div>

    </div>
  );
};

// --- STYLES ---
const styles = {
  pageContainer: {
    minHeight: '100dvh', // UPDATED: Perfect dynamic screen fitting
    width: '100%',
    backgroundColor: '#020617', 
    padding: '40px 5%',
    fontFamily: "'Inter', sans-serif",
    color: '#ffffff',
  },
  header: {
    marginBottom: '40px',
    textAlign: 'center', // Centers the header for a cleaner look
  },
  title: {
    fontSize: '36px',
    fontWeight: '900',
    margin: '0 0 10px 0',
    letterSpacing: '-1px'
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '16px',
    margin: 0,
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '50px',
    maxWidth: '1200px',
    margin: '0 auto 50px auto', // Keeps cards centered on ultra-wide screens
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: '24px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    border: '1px solid #1e293b',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '30px',
    color: '#f8fafc',
    textAlign: 'center',
  },
  scoreCircleOuter: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    boxShadow: '0 0 20px rgba(0,0,0,0.3)',
  },
  scoreCircleInner: {
    width: '136px', 
    height: '136px',
    borderRadius: '50%',
    backgroundColor: '#0f172a', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: '38px',
    fontWeight: '900',
  },
  scoreStatus: {
    color: '#cbd5e1',
    fontSize: '15px',
    fontWeight: '600',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '12px',
  },
  foundTag: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid rgba(34, 197, 94, 0.2)',
    color: '#4ade80',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
  },
  missingTag: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#f87171',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
  },
  actionSection: {
    backgroundColor: '#0f172a',
    borderRadius: '24px',
    padding: '50px 40px',
    textAlign: 'center',
    border: '1px solid #1e293b',
    maxWidth: '900px',
    margin: '0 auto',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  actionTitle: {
    fontSize: '28px',
    fontWeight: '900',
    marginBottom: '15px',
    color: '#ffffff',
    letterSpacing: '-0.5px'
  },
  actionSubtitle: {
    color: '#94a3b8',
    fontSize: '18px',
    marginBottom: '35px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap', // Prevents buttons from squishing on small phones
  },
  jobsBtn: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)',
  },
  downloadBtn: {
    backgroundColor: 'transparent',
    color: '#cbd5e1',
    border: '1px solid #334155',
    padding: '16px 32px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }
};

// --- HIDE BUTTONS DURING PRINTING ---
if (typeof document !== 'undefined') {
  const printStyle = document.createElement("style");
  printStyle.innerText = `
    @media print {
      body { background-color: white !important; color: black !important; }
      .actionSection, button { display: none !important; }
    }
  `;
  document.head.appendChild(printStyle);
}

export default Dashboard;
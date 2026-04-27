import React, { useState } from 'react';

const Jobs = ({ analysisData }) => {
  const [expandedJobId, setExpandedJobId] = useState(null);

  // 1. RICH UI DETAILS
  // These match the titles from your Python Server so we can attach salaries and logos to them!
  const richJobDetails = [
    {
      id: 1,
      title: "MERN Stack Developer",
      company: "TechCorp India",
      location: "Remote",
      salary: "₹12L - ₹18L",
      type: "Full-time",
      previewSkills: ["MongoDB", "Express.js", "React", "Node.js"],
      requiredSkills: ["Expertise in MongoDB Aggregation", "Advanced React Context & Hooks", "AWS Deployment (EC2/S3)", "Redis for Caching"]
    },
    {
      id: 2,
      title: "Python Data Scientist",
      company: "AI Innovations",
      location: "Bengaluru, IN",
      salary: "₹18L - ₹25L",
      type: "On-site",
      previewSkills: ["Python", "Pandas", "Scikit-Learn"],
      requiredSkills: ["Mathematical Modeling", "Natural Language Processing", "Data Visualization", "Statistical Analysis"]
    },
    {
      id: 3,
      title: "Frontend Engineer",
      company: "Creative Web",
      location: "Remote",
      salary: "₹10L - ₹15L",
      type: "Full-time",
      previewSkills: ["React", "TypeScript", "Tailwind CSS"],
      requiredSkills: ["Performance Optimization", "Responsive Design Principles", "Jest/Cypress Testing", "UI/UX Design Patterns"]
    },
    {
      id: 4,
      title: "AI/ML Specialist",
      company: "SkyScale Systems",
      location: "Hyderabad, IN",
      salary: "₹22L - ₹30L",
      type: "Hybrid",
      previewSkills: ["PyTorch", "TensorFlow", "Deep Learning"],
      requiredSkills: ["Computer Vision", "Neural Networks", "Model Deployment (MLOps)", "Python Mastery"]
    },
    {
      id: 5,
      title: "Backend Specialist",
      company: "SecureNet",
      location: "Mumbai, IN",
      salary: "₹16L - ₹24L",
      type: "Contract",
      previewSkills: ["Node.js", "Java", "Docker"],
      requiredSkills: ["Microservices Architecture", "Kubernetes", "SQL/NoSQL Database Design", "Spring Boot"]
    }
  ];

  const toggleSkills = (id) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  // 2. THE DYNAMIC MERGE LOGIC
  // Default to 0% if no resume is uploaded yet
  let displayJobs = richJobDetails.map(job => ({ ...job, match: "0%" }));

  // If we have AI data from Python, merge it!
  if (analysisData && analysisData.recommendedJobs) {
    displayJobs = analysisData.recommendedJobs.map(apiJob => {
      const details = richJobDetails.find(j => j.title === apiJob.title) || {};
      return {
        ...details,
        id: apiJob.id,
        title: apiJob.title,
        match: `${apiJob.match_score}%` // Injecting the REAL AI SCORE here!
      };
    });
  }

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <div style={styles.badge}>🎯 Personalized for Shivam</div>
        <h1 style={styles.pageTitle}>Career Opportunities</h1>
        <p style={styles.pageSubtitle}>
          We've analyzed your profile. Here are the roles that match your skill set the best.
        </p>
      </header>

      {/* Warning banner if there's no dynamic data yet */}
      {(!analysisData || !analysisData.recommendedJobs) && (
        <div style={{ textAlign: 'center', marginBottom: '40px', color: '#f59e0b', fontSize: '15px', fontWeight: 'bold' }}>
          ⚠️ Showing sample data. Please upload your resume on the Upload page to get your personalized AI match scores!
        </div>
      )}

      <div style={styles.grid}>
        {displayJobs.map((job) => (
          <div key={job.id} style={styles.card}>
            
            <div style={styles.cardHeader}>
               <div style={styles.matchGroup}>
                  <div style={{
                    ...styles.matchDot, 
                    // Color changes based on the dynamic score!
                    backgroundColor: parseFloat(job.match) >= 80 ? '#22c55e' : parseFloat(job.match) >= 50 ? '#eab308' : '#ef4444'
                  }}></div>
                  <span style={styles.matchValue}>{job.match} Match</span>
               </div>
               <span style={styles.jobType}>{job.type || "Full-Time"}</span>
            </div>

            <h2 style={styles.jobTitle}>{job.title}</h2>
            <p style={styles.companyName}>🏢 {job.company || "Tech Company"} • <span style={{color: '#94a3b8'}}>{job.location || "Remote"}</span></p>
            <p style={styles.salaryText}>💰 {job.salary || "Competitive"}</p>

            <div style={styles.pillsContainer}>
              {job.previewSkills?.map((skill, idx) => (
                <span key={idx} style={styles.pill}>{skill}</span>
              ))}
            </div>

            {expandedJobId === job.id && (
              <div style={styles.expandedContent}>
                <h4 style={styles.sectionTitle}>Deep Analysis Requirements:</h4>
                <div style={styles.reqList}>
                  {job.requiredSkills?.map((req, idx) => (
                    <div key={idx} style={styles.reqItem}>
                      <span style={styles.check}>✓</span> {req}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={() => toggleSkills(job.id)}
              style={expandedJobId === job.id ? styles.btnActive : styles.btnOutline}
            >
              {expandedJobId === job.id ? "Close Details" : "Check Skill Requirements"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  pageContainer: { 
    minHeight: '100dvh', // <-- FIXED: Changed from 100vh to 100dvh
    backgroundColor: '#020617', 
    color: '#ffffff', 
    padding: '60px 5%', 
    fontFamily: "'Inter', sans-serif" 
  },
  header: { textAlign: 'center', marginBottom: '60px' },
  badge: { display: 'inline-block', padding: '6px 16px', backgroundColor: 'rgba(37, 99, 235, 0.1)', color: '#3b82f6', borderRadius: '20px', fontSize: '14px', fontWeight: '700', marginBottom: '15px', border: '1px solid rgba(37, 99, 235, 0.2)' },
  pageTitle: { fontSize: '42px', fontWeight: '900', margin: '0 0 15px 0', letterSpacing: '-1px' },
  pageSubtitle: { color: '#94a3b8', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px', maxWidth: '1300px', margin: '0 auto' },
  card: { backgroundColor: '#0f172a', borderRadius: '24px', padding: '32px', border: '1px solid #1e293b', transition: 'transform 0.3s ease, border-color 0.3s ease', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  matchGroup: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', padding: '6px 12px', borderRadius: '10px' },
  matchDot: { width: '8px', height: '8px', borderRadius: '50%' },
  matchValue: { fontSize: '13px', fontWeight: '700', color: '#f8fafc' },
  jobType: { fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' },
  jobTitle: { fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: '#ffffff' },
  companyName: { fontSize: '15px', fontWeight: '600', color: '#3b82f6', marginBottom: '5px' },
  salaryText: { fontSize: '14px', color: '#94a3b8', fontWeight: '500', marginBottom: '20px' },
  pillsContainer: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '30px', flexGrow: 1 },
  pill: { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid #334155', color: '#cbd5e1', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' },
  expandedContent: { backgroundColor: '#020617', padding: '20px', borderRadius: '16px', marginBottom: '20px', border: '1px solid #1e293b', animation: 'slideDown 0.3s ease-out' },
  sectionTitle: { fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' },
  reqList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  reqItem: { fontSize: '14px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' },
  check: { color: '#22c55e', fontWeight: 'bold' },
  btnOutline: { padding: '14px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #334155', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' },
  btnActive: { padding: '14px', backgroundColor: '#2563eb', color: '#ffffff', border: '1px solid #2563eb', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' }
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .card:hover { border-color: #3b82f6 !important; transform: translateY(-5px); }
  `;
  document.head.appendChild(styleSheet);
}

export default Jobs;
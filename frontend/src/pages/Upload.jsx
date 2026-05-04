import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Upload = ({ setAnalysisData }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF!");
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      // --- STEP 1: Send PDF to Node.js backend for parsing and ATS Score ---
      const res = await fetch('https://ai-resume-node.onrender.com/api/upload', { 
        method: 'POST', 
        body: formData 
      });
      const data = await res.json();
      
      if (res.ok) {
        
        // --- STEP 2: Send extracted text to Python ML Server ---
        try {
          console.log("Sending text to Python Brain...");
          // Adjust 'data.text' based on exactly what your Node.js backend returns
          const extractedText = data.text || data.extractedText || ""; 

          const pyRes = await fetch('https://ai-brain-llul.onrender.com/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resume_text: extractedText })
          });
          
          if (pyRes.ok) {
             const recommendedJobs = await pyRes.json();
             // Attach the jobs list to the main data object so it can be used in Dashboard/Jobs
             data.recommendedJobs = recommendedJobs;
          } else {
             console.error("Python Server returned an error.");
          }
        } catch (pyErr) {
          console.error("Could not reach Python ML server:", pyErr);
        }

        // --- STEP 3: Save Data & Navigate ---
        setAnalysisData(data);
        navigate('/dashboard');

      } else {
        alert("Error: " + (data.error || "Failed to analyze."));
      }
    } catch (err) { 
      alert("Server error. Please make sure BOTH Node.js and Python backends are running!"); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        
        {/* Left Side: Context & Trust Markers */}
        <div style={styles.textSection}>
          <div style={styles.badge}>🚀 AI-Powered Analysis</div>
          <h1 style={styles.mainTitle}>Upload your resume for an instant ATS check.</h1>
          <p style={styles.description}>
            Our proprietary AI engine scans your PDF against thousands of real-world job descriptions to uncover critical skill gaps and format issues before you apply.
          </p>
          <ul style={styles.featureList}>
            <li style={styles.featureItem}>✨ Instantly identify missing keywords</li>
            <li style={styles.featureItem}>📊 Get a precise ATS compatibility score</li>
            <li style={styles.featureItem}>🎯 Receive personalized job matches</li>
          </ul>
        </div>

        {/* Right Side: The Upload Card */}
        <div style={styles.uploadCard}>
          <h2 style={styles.cardTitle}>Select Resume</h2>
          <p style={styles.cardSubtitle}>Supported format: PDF up to 5MB</p>
          
          {/* DRAG AND DROP ZONE */}
          <div 
            style={{
                ...styles.dropZone,
                borderColor: dragActive ? '#3b82f6' : '#334155',
                backgroundColor: dragActive ? 'rgba(59, 130, 246, 0.05)' : '#0f172a',
                boxShadow: dragActive ? '0 0 20px rgba(59, 130, 246, 0.2)' : 'none'
            }}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                if(e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setFile(e.dataTransfer.files[0]);
                }
            }}
          >
            {loading ? (
                // State: Actively Scanning
                <div style={styles.scanningState}>
                    <div className="scanner-line"></div>
                    <div style={styles.spinner}>⚙️</div>
                    <p style={styles.scanningText}>Analyzing Document...</p>
                    <p style={styles.scanningSubText}>Extracting skills and calculating ATS score</p>
                </div>
            ) : file ? (
                // State: File is selected
                <div style={styles.fileSelected}>
                    <div style={styles.fileIcon}>📄</div>
                    <div style={styles.fileDetails}>
                      <p style={styles.fileName}>{file.name}</p>
                      <p style={styles.fileSize}>Ready for analysis</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setFile(null); }} 
                      style={styles.removeFileBtn}
                    >
                      ✕
                    </button>
                </div>
            ) : (
                // State: Waiting for file
                <div style={styles.waitingState}>
                    <div style={styles.uploadIcon}>📥</div>
                    <p style={styles.dropText}>Drag & Drop your PDF here</p>
                    <p style={styles.orText}>- OR -</p>
                    <label style={styles.browseButton}>
                        Browse Local Files
                        <input 
                            type="file" 
                            accept=".pdf" 
                            onChange={(e) => setFile(e.target.files[0])} 
                            style={{ display: 'none' }} 
                        />
                    </label>
                </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            onClick={handleUpload} 
            disabled={loading || !file} 
            style={{
                ...styles.submitBtn,
                opacity: (loading || !file) ? 0.5 : 1,
                cursor: (loading || !file) ? 'not-allowed' : 'pointer',
                transform: (loading || !file) ? 'scale(1)' : 'scale(1.02)'
            }}
          >
            {loading ? "Processing..." : "Initiate AI Scan"}
          </button>
        </div>
        
      </div>
    </div>
  );
};

// --- STYLES OBJECT ---
const styles = {
  pageContainer: {
    minHeight: 'calc(100vh - 70px)', 
    backgroundColor: '#020617',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 5%',
    fontFamily: "'Inter', sans-serif",
    color: '#f8fafc',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    width: '100%',
    gap: '60px',
    flexWrap: 'wrap',
  },
  textSection: {
    flex: '1 1 400px',
    maxWidth: '550px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: '#60a5fa',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '20px',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  },
  mainTitle: {
    fontSize: '46px',
    fontWeight: '800',
    lineHeight: '1.2',
    marginBottom: '20px',
    letterSpacing: '-1px',
    color: '#ffffff',
  },
  description: {
    fontSize: '18px',
    color: '#94a3b8',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  featureList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  featureItem: {
    fontSize: '16px',
    color: '#cbd5e1',
    fontWeight: '500',
  },
  uploadCard: {
    flex: '1 1 400px',
    backgroundColor: '#0f172a',
    padding: '40px',
    borderRadius: '24px',
    border: '1px solid #1e293b',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    maxWidth: '500px',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 5px 0',
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '25px',
  },
  dropZone: {
    border: '2px dashed',
    borderRadius: '16px',
    padding: '40px 20px',
    transition: 'all 0.3s ease',
    marginBottom: '25px',
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  waitingState: {
    textAlign: 'center',
  },
  uploadIcon: {
    fontSize: '48px',
    marginBottom: '15px',
    opacity: 0.8,
  },
  dropText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#e2e8f0',
    margin: '0 0 10px 0',
  },
  orText: {
    fontSize: '12px',
    color: '#64748b',
    margin: '0 0 15px 0',
    fontWeight: '500',
  },
  browseButton: {
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    border: '1px solid #334155',
    transition: 'all 0.2s',
  },
  fileSelected: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1e293b',
    padding: '15px 20px',
    borderRadius: '12px',
    border: '1px solid #3b82f6',
    boxSizing: 'border-box',
  },
  fileIcon: {
    fontSize: '28px',
    marginRight: '15px',
  },
  fileDetails: {
    flexGrow: 1,
    textAlign: 'left',
  },
  fileName: {
    margin: '0 0 4px 0',
    fontWeight: '600',
    color: '#f8fafc',
    fontSize: '15px',
    wordBreak: 'break-all',
  },
  fileSize: {
    margin: 0,
    fontSize: '12px',
    color: '#3b82f6',
    fontWeight: '500',
  },
  removeFileBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#94a3b8',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '5px',
  },
  scanningState: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  spinner: {
    fontSize: '40px',
    animation: 'spin 2s linear infinite',
    marginBottom: '15px',
  },
  scanningText: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#60a5fa',
    margin: '0 0 5px 0',
  },
  scanningSubText: {
    fontSize: '13px',
    color: '#64748b',
    margin: 0,
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
  }
};

// --- CSS ANIMATIONS INJECTION ---
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    @keyframes spin { 100% { transform: rotate(360deg); } }
    
    .scanner-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #60a5fa;
      box-shadow: 0 0 15px #60a5fa;
      animation: scan 2s ease-in-out infinite;
      opacity: 0.7;
    }

    @keyframes scan {
      0% { top: 0%; opacity: 0; }
      10% { opacity: 0.7; }
      90% { opacity: 0.7; }
      100% { top: 100%; opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Upload;
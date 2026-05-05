import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useAuth, SignInButton } from "@clerk/clerk-react";
import { useState } from 'react';

// Import your page components (Notice Login is gone!)
import Home from './pages/Home';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';

// Import the Global Footer
import Footer from './components/Footer.jsx';

// --- NAVBAR COMPONENT ---
const Navbar = () => (
  <nav style={navStyles.navbar}>
    <Link to="/" style={navStyles.logo}>
      A.I Resume Analyzer <span style={{ color: '#333' }}>& Job Recommendation System</span>
    </Link>
    
    <div style={navStyles.navLinks}>
      <Link to="/" style={navStyles.link}>Home</Link>
      
      <SignedIn>
        <Link to="/upload" style={navStyles.link}>Upload</Link>
        <Link to="/dashboard" style={navStyles.link}>ATS Score</Link>
        <Link to="/jobs" style={navStyles.link}>Jobs</Link>
      </SignedIn>
      
      <SignedOut>
        {/* THE FIX: Replaced the <Link to="/login"> with the Clerk Modal Button */}
        <SignInButton mode="modal" fallbackRedirectUrl="/upload">
          <button style={navStyles.loginBtn}>Login to Start</button>
        </SignInButton>
      </SignedOut>
      
      <SignedIn>
        <div style={{ marginLeft: '10px' }}>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </div>
  </nav>
);

// --- PROTECTED ROUTE WRAPPER ---
const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  
  if (!isLoaded) return <div style={navStyles.loading}>Loading Security...</div>;
  
  // THE FIX: If they aren't logged in, send them back to the Home page 
  // where they can click the Modal button.
  if (!isSignedIn) return <Navigate to="/" replace />;
  
  return children;
};

// --- APP CONTENT WRAPPER ---
const AppContent = () => {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', 
      width: '100%', 
      backgroundColor: '#020617' // Unified background
    }}>
      
      {/* Navbar is now always visible */}
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* Protected Routes (Require Login) */}
          <Route path="/upload" element={
            <ProtectedRoute>
              <Upload setAnalysisData={setAnalysisData} />
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard data={analysisData} />
            </ProtectedRoute>
          } />

          <Route path="/jobs" element={
            <ProtectedRoute>
              <Jobs analysisData={analysisData} />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer rendered on all pages */}
      <Footer />
    </div>
  );
};

// --- FINAL APP COMPONENT ---
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// --- STYLING OBJECTS ---
const navStyles = {
  navbar: {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '15px 50px', 
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    position: 'sticky', 
    top: 0, 
    zIndex: 1000
  },
  logo: { fontSize: '22px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' },
  navLinks: { display: 'flex', gap: '30px', alignItems: 'center' },
  link: { textDecoration: 'none', color: '#1e293b', fontWeight: '600', fontSize: '14px' },
  loginBtn: { 
    padding: '10px 24px', 
    borderRadius: '10px', 
    border: 'none', 
    backgroundColor: '#0f172a', 
    color: '#fff', 
    cursor: 'pointer', 
    fontWeight: '700',
    transition: 'all 0.2s'
  },
  loading: { textAlign: 'center', color: '#fff', marginTop: '100px', fontSize: '18px' }
};

export default App;
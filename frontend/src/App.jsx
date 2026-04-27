import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import { useState } from 'react';

// Import your page components
import Home from './pages/Home';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Login from './pages/Login';

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
        <Link to="/login">
          <button style={navStyles.loginBtn}>Login to Start</button>
        </Link>
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
  if (!isSignedIn) return <Navigate to="/login" replace />;
  return children;
};

// --- APP CONTENT WRAPPER ---
const AppContent = () => {
  const location = useLocation();
  const [analysisData, setAnalysisData] = useState(null);

  // Logic to differentiate pages
  const isLoginPage = location.pathname === '/login';

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', 
      width: '100%', 
      // Switches background based on the current page
      backgroundColor: isLoginPage ? '#ffffff' : '#020617' 
    }}>
      
      {/* 1. Show Navbar only if NOT on the login page */}
      {!isLoginPage && <Navbar />}
      
      {/* 2. Main Content expands to push Footer to the bottom */}
      <main style={{ flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

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

      {/* 3. Footer rendered on all pages */}
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
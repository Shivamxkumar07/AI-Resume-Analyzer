import React from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaWhatsapp 
} from 'react-icons/fa'; // Ensure you have installed: npm install react-icons

const Footer = () => {
  return (
    <footer style={styles.footerContainer}>
      <div style={styles.footerContent}>
        
        {/* Section 1: Contact Info */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>GET IN TOUCH</h4>
          <p style={styles.contactItem}>📞 Phone: +91-7859074570</p>
          <p style={styles.contactItem}>
            📧 Email: <a href="mailto:kumarshivam997318@gmail.com" style={styles.footerNavLink}>kumarshivam997318@gmail.com</a>
          </p>
          <div style={styles.supportLinks}>
            <a href="#" style={styles.footerNavLink} onClick={(e) => {e.preventDefault(); alert("Feedback coming soon!")}}>Feedback</a>
            <span style={{ opacity: 0.4 }}>|</span>
            <a href="#" style={styles.footerNavLink} onClick={(e) => {e.preventDefault(); alert("Support coming soon!")}}>Support</a>
          </div>
        </div>

        {/* Section 2: Spacer/App Section (Optional) */}
        <div style={styles.section}></div>

        {/* Section 3: Social Media */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>SOCIAL MEDIA</h4>
          <div style={styles.socialGroup}>
            <a href="https://www.facebook.com/profile.php?id=100072303580898" target="_blank" rel="noreferrer" style={styles.socialCircle} title="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/_shivam_zzzzzzz/" target="_blank" rel="noreferrer" style={styles.socialCircle} title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/shivam-kumar-36b941361/" target="_blank" rel="noreferrer" style={styles.socialCircle} title="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://wa.me/qr/QIBQEVHB6FAHN1" target="_blank" rel="noreferrer" style={styles.socialCircle} title="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div style={styles.copyrightBar}>
        <p>© 2024 ResumeAI. Created by Shivam Kumar.</p>
      </div>
    </footer>
  );
};

const styles = {
  footerContainer: {
    width: '100%',
    backgroundColor: '#010607', // Darker theme
    color: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '30px',
  },
  section: {
    flex: '1 1 250px',
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: '800',
    marginBottom: '20px',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  contactItem: {
    marginBottom: '10px',
    fontSize: '14px',
    color: '#cbd5e1',
  },
  supportLinks: {
    marginTop: '20px',
    display: 'flex',
    gap: '15px',
    fontSize: '14px',
    fontWeight: '600',
  },
  footerNavLink: {
    textDecoration: 'none',
    color: '#ffffff',
    transition: 'opacity 0.2s',
  },
  socialGroup: {
    display: 'flex',
    gap: '12px',
  },
  socialCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  copyrightBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    padding: '20px',
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.5)',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  }
};

export default Footer;
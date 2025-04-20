import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Global Technology Solutions</h3>
          <p>
            Empowering enterprises worldwide with innovative technology solutions 
            and strategic digital transformation services.
          </p>
        </div>
        <div className="footer-section">
          <h3>Strategic Services</h3>
          <ul>
            <li>Enterprise Architecture</li>
            <li>Digital Transformation</li>
            <li>Cloud Solutions</li>
            <li>AI & Machine Learning</li>
            <li>Cybersecurity</li>
            <li>Data Analytics</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Global Presence</h3>
          <ul>
            <li>North America</li>
            <li>Europe</li>
            <li>Asia Pacific</li>
            <li>Middle East</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Dvaita Technologies. All rights reserved.</p>
        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Compliance</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer 
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">Dvaita Technologies</Link>
        </div>
        
        <div className="navbar-right">
          <button 
            className={`mobile-menu-button ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/services" onClick={handleLinkClick}>Services</Link>
          <Link to="/about" onClick={handleLinkClick}>About</Link>
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

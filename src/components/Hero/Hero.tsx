import { useNavigate } from 'react-router-dom';
import './Hero.css'

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact');
  };

  return (
    <section className="hero">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="hero-content">
        <h1>Custom Software Solutions</h1>
        <p>Expert consulting for businesses seeking innovative technology solutions that drive growth and efficiency</p>
        <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
      </div>
    </section>
  )
}

export default Hero

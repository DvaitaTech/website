import { useNavigate } from 'react-router-dom';
import './Hero.css'

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Custom Software Solutions</h1>
        <p>Expert consulting for businesses seeking innovative technology solutions</p>
        <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
      </div>
    </section>
  )
}

export default Hero

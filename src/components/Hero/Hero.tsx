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
        <h1>Enterprise Technology Solutions</h1>
        <p>Strategic technology transformation for global enterprises, delivering innovative solutions that drive digital excellence and sustainable growth</p>
        <button className="cta-button" onClick={handleGetStarted}>Schedule a Consultation</button>
      </div>
    </section>
  )
}

export default Hero

import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Dvaita Technologies</h1>
        <p>Empowering businesses through modern DevOps solutions</p>
      </section>

      <section className="about-content">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            At Dvaita Technologies, we're committed to helping organizations 
            transform their development and operations through modern cloud 
            practices and automation.
          </p>
        </div>

        <div className="values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Innovation</h3>
              <p>Constantly evolving and adopting cutting-edge technologies</p>
            </div>
            <div className="value-card">
              <h3>Excellence</h3>
              <p>Delivering high-quality solutions that exceed expectations</p>
            </div>
            <div className="value-card">
              <h3>Collaboration</h3>
              <p>Working closely with clients to achieve their goals</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

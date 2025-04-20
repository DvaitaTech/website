import './About.css'

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-content">
          <h2>Global Technology Excellence</h2>
          <p>
            As a multinational technology consulting firm, we specialize in delivering enterprise-grade solutions 
            that drive digital transformation and innovation. Our team of industry experts combines deep technical 
            expertise with strategic business acumen to help global enterprises navigate complex technology 
            challenges and achieve sustainable competitive advantage.
          </p>
          <p>
            With a proven track record of successful enterprise implementations across diverse industries, 
            we bring a wealth of experience in architecting scalable, secure, and innovative solutions 
            that meet the evolving needs of modern businesses.
          </p>
          <div className="about-stats">
            <div className="stat">
              <h3>15+</h3>
              <p>Years of Enterprise Excellence</p>
            </div>
            <div className="stat">
              <h3>500+</h3>
              <p>Enterprise Clients Worldwide</p>
            </div>
            <div className="stat">
              <h3>1000+</h3>
              <p>Enterprise Projects Delivered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 
import './About.css'

const About = () => {
  const values = [
    {
      title: 'Strategic Innovation',
      description: 'Leading global enterprises through cutting-edge technology adoption and digital transformation initiatives.'
    },
    {
      title: 'Enterprise Excellence',
      description: 'Delivering world-class solutions that exceed expectations and drive measurable business outcomes.'
    },
    {
      title: 'Strategic Partnership',
      description: 'Building long-term collaborative relationships with global enterprises to achieve sustainable competitive advantage.'
    },
    {
      title: 'Global Integrity',
      description: 'Maintaining the highest standards of professional ethics and corporate governance across all operations.'
    }
  ]

  const timeline = [
    {
      year: '2018',
      title: 'Global Technology Vision',
      description: 'Established with a mission to transform enterprise technology infrastructure worldwide.'
    },
    {
      year: '2020',
      title: 'International Expansion',
      description: 'Expanded operations to serve enterprise clients across North America, Europe, and Asia Pacific.'
    },
    {
      year: '2022',
      title: 'Cloud Excellence Recognition',
      description: 'Achieved premier partnership status with major cloud providers and established global delivery centers.'
    },
    {
      year: '2023',
      title: 'Enterprise Innovation Hub',
      description: 'Launched our global innovation lab focusing on AI, blockchain, and cloud-native enterprise solutions.'
    }
  ]

  return (
    <main className="about-page">
      <article>
        <header className="about-hero">
          <p>Transforming global enterprises through strategic technology solutions and digital excellence</p>
        </header>

        <div className="about-content">
          <section className="mission" aria-labelledby="mission-heading">
            <h2 id="mission-heading">Our Strategic Mission</h2>
            <p>
              To empower global enterprises with cutting-edge technology solutions that drive 
              innovation, operational excellence, and sustainable competitive advantage in the digital economy.
            </p>
          </section>

          <section className="values" aria-labelledby="values-heading">
            <h2 id="values-heading">Enterprise Values</h2>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="timeline" aria-labelledby="timeline-heading">
            <h2 id="timeline-heading">Global Journey</h2>
            <div className="timeline-grid">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <time className="timeline-year">{item.year}</time>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}

export default About

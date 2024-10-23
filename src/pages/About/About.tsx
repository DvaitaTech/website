import './About.css'

const About = () => {
  const values = [
    {
      title: 'Innovation',
      description: 'Constantly exploring cutting-edge technologies and methodologies to deliver the best solutions for our clients.'
    },
    {
      title: 'Excellence',
      description: 'Committed to delivering high-quality solutions that exceed expectations and drive real business value.'
    },
    {
      title: 'Collaboration',
      description: 'Working closely with our clients as true partners to understand their needs and achieve their goals.'
    },
    {
      title: 'Integrity',
      description: 'Operating with transparency, honesty, and ethical practices in all our business relationships.'
    }
  ]

  const timeline = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'Started with a vision to transform enterprise IT infrastructure.'
    },
    {
      year: '2020',
      title: 'Global Expansion',
      description: 'Expanded operations to serve clients across three continents.'
    },
    {
      year: '2022',
      title: 'Cloud Excellence',
      description: 'Achieved premier partnership status with major cloud providers.'
    },
    {
      year: '2023',
      title: 'Innovation Hub',
      description: 'Launched our innovation lab focusing on AI and cloud-native solutions.'
    }
  ]

  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Us</h1>
        <p>Transforming businesses through innovative cloud solutions and technical excellence</p>
      </section>

      <div className="about-content">
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            To empower organizations with cutting-edge cloud solutions that drive 
            innovation, efficiency, and sustainable growth in the digital age.
          </p>
        </section>

        <section className="values">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="timeline">
          <h2>Our Journey</h2>
          <div className="timeline-grid">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default About

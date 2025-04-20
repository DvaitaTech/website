import './Services.css'

const services = [
  {
    title: 'Enterprise Cloud Transformation',
    description: 'Strategic cloud adoption and migration services for global enterprises, ensuring seamless transition to cloud-native architectures.',
    caseStudy: {
      client: 'Global Financial Services Corporation',
      challenge: 'Legacy infrastructure limiting innovation and scalability',
      solution: 'Implemented hybrid cloud architecture with automated governance',
      result: '40% reduction in operational costs, 60% faster time-to-market'
    }
  },
  {
    title: 'DevOps Excellence',
    description: 'Enterprise-grade DevOps implementation with advanced automation, security, and compliance frameworks.',
    caseStudy: {
      client: 'Fortune 500 Technology Company',
      challenge: 'Complex deployment processes and inconsistent environments',
      solution: 'Established end-to-end CI/CD pipeline with automated testing',
      result: '85% reduction in deployment time, 99.99% system availability'
    }
  },
  {
    title: 'Strategic Technology Consulting',
    description: 'Comprehensive technology strategy and architecture planning for enterprise digital transformation initiatives.',
    caseStudy: {
      client: 'Leading Healthcare Provider',
      challenge: 'Fragmented technology landscape and compliance requirements',
      solution: 'Developed integrated technology roadmap with security-first approach',
      result: 'Achieved regulatory compliance while reducing IT complexity by 50%'
    }
  },
  {
    title: 'Enterprise Security Solutions',
    description: 'Advanced security architecture and implementation for protecting enterprise assets and ensuring compliance.',
    caseStudy: {
      client: 'Global Manufacturing Enterprise',
      challenge: 'Increasing cybersecurity threats and regulatory pressure',
      solution: 'Implemented zero-trust security architecture with AI-powered monitoring',
      result: 'Zero security incidents, 100% compliance with industry standards'
    }
  }
]

const Services = () => {
  return (
    <main className="services-page">
      <header className="services-hero">
        <h1>Strategic Technology Solutions</h1>
        <p>Empowering global enterprises with cutting-edge technology solutions and digital transformation expertise</p>
      </header>

      <section className="services-grid" aria-label="Our Services">
        {services.map((service, index) => (
          <article key={index} className="service-card">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            
            <div className="case-study">
              <h3>Enterprise Success Story</h3>
              <div className="case-study-content">
                <p><strong>Client:</strong> {service.caseStudy.client}</p>
                <p><strong>Challenge:</strong> {service.caseStudy.challenge}</p>
                <p><strong>Solution:</strong> {service.caseStudy.solution}</p>
                <p><strong>Result:</strong> {service.caseStudy.result}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="cta-section">
        <h2>Transform Your Enterprise</h2>
        <p>Partner with us to drive innovation and achieve sustainable competitive advantage</p>
        <button className="cta-button">Schedule Strategic Consultation</button>
      </section>
    </main>
  )
}

export default Services

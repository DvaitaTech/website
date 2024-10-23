import './Services.css'

const Services = () => {
  const services = [
    {
      title: 'Cloud Infrastructure',
      description: 'Design and implementation of scalable cloud architectures on AWS, Azure, and GCP. Optimize costs and improve reliability.',
      features: ['Infrastructure as Code', 'Cloud Migration', 'Cost Optimization', 'High Availability Design'],
      technologies: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation'],
      caseStudy: {
        title: 'Enterprise Cloud Migration',
        description: 'Successfully migrated a large enterprise from on-premise to cloud, reducing costs by 40%'
      }
    },
    {
      title: 'DevOps Automation',
      description: 'Streamline your development workflow with modern CI/CD pipelines and automation tools.',
      features: ['CI/CD Pipeline Setup', 'Automated Testing', 'Deployment Automation', 'Monitoring & Alerting'],
      technologies: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'ArgoCD', 'Spinnaker'],
      caseStudy: {
        title: 'CI/CD Pipeline Optimization',
        description: 'Reduced deployment time from hours to minutes for a major SaaS provider'
      }
    },
    {
      title: 'Kubernetes Solutions',
      description: 'Expert container orchestration and microservices architecture implementation.',
      features: ['Cluster Setup & Management', 'Application Containerization', 'Service Mesh Implementation', 'Security Hardening'],
      technologies: ['Kubernetes', 'Docker', 'Istio', 'Helm', 'Prometheus'],
      caseStudy: {
        title: 'Microservices Transformation',
        description: 'Modernized a monolithic application into microservices, improving scalability and reliability'
      }
    }
  ]

  return (
    <div className="services-page">
      <h1>Our Services</h1>
      <p className="services-intro">
        Detailed information about our core services and how we can help transform your business
      </p>
      
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h2>{service.title}</h2>
            <p className="service-description">{service.description}</p>
            
            <div className="service-features">
              <h3>Key Features</h3>
              <ul>
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="service-tech">
              <h3>Technologies</h3>
              <div className="tech-tags">
                {service.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="case-study">
              <h3>Case Study</h3>
              <h4>{service.caseStudy.title}</h4>
              <p>{service.caseStudy.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services

import './Features.css'

const Features = () => {
  const features = [
    {
      icon: '💻',
      title: 'Enterprise Software Architecture',
      description: 'Strategic design and implementation of scalable enterprise solutions using cutting-edge technologies'
    },
    {
      icon: '🌐',
      title: 'Digital Transformation',
      description: 'End-to-end digital transformation initiatives for global enterprises'
    },
    {
      icon: '📱',
      title: 'Enterprise Mobility Solutions',
      description: 'Secure, scalable mobile platforms for enterprise workforce enablement'
    },
    {
      icon: '🚀',
      title: 'Cloud Infrastructure & Strategy',
      description: 'Enterprise-grade cloud architecture and migration services across AWS, Azure & GCP'
    },
    {
      icon: '🤖',
      title: 'Enterprise AI Solutions',
      description: 'Strategic implementation of AI and machine learning for business process optimization'
    },
    {
      icon: '🔐',
      title: 'Enterprise Security',
      description: 'Comprehensive security architecture and compliance frameworks for global operations'
    },
    {
      icon: '⚙️',
      title: 'Enterprise Integration',
      description: 'Seamless integration of enterprise systems and microservices architecture'
    },
    {
      icon: '🔄',
      title: 'Legacy Modernization',
      description: 'Strategic transformation of legacy systems into modern enterprise platforms'
    },
    {
      icon: '📊',
      title: 'Enterprise Analytics',
      description: 'Advanced business intelligence and data-driven decision making platforms'
    },
    {
      icon: '🔍',
      title: 'Enterprise UX Strategy',
      description: 'Strategic user experience design for enterprise-scale applications'
    },
    {
      icon: '🛒',
      title: 'Enterprise Commerce',
      description: 'Scalable e-commerce platforms for global market operations'
    },
    {
      icon: '🔧',
      title: 'Enterprise DevOps',
      description: 'Enterprise-grade CI/CD and infrastructure automation'
    },
    {
      icon: '💡',
      title: 'Technology Strategy',
      description: 'Strategic technology roadmap development and digital transformation planning'
    },
    {
      icon: '📈',
      title: 'Enterprise Scalability',
      description: 'Architecture optimization for global-scale operations'
    },
    {
      icon: '🤝',
      title: 'Strategic Technology Partnership',
      description: 'Long-term technology partnership for enterprise innovation'
    }
  ]

  return (
    <section className="features">
      <div className="features-container">
        <h2>Enterprise Solutions</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

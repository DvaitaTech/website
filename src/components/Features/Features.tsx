import './Features.css'

const Features = () => {
  const features = [
    {
      icon: '💻',
      title: 'Custom Software Development',
      description: 'Tailored solutions for your unique business needs using modern technologies'
    },
    {
      icon: '🌐',
      title: 'Web Applications',
      description: 'Responsive, scalable web applications with cutting-edge frontend and backend technologies'
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps for iOS and Android'
    },
    {
      icon: '🚀',
      title: 'Cloud Solutions',
      description: 'Scalable cloud architecture and migration services for AWS, Azure & GCP'
    },
    {
      icon: '🤖',
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions leveraging the latest in artificial intelligence and machine learning'
    },
    {
      icon: '🔐',
      title: 'Cybersecurity',
      description: 'Application security, penetration testing, and secure development practices'
    },
    {
      icon: '⚙️',
      title: 'API Development',
      description: 'RESTful and GraphQL API design, development and integration'
    },
    {
      icon: '🔄',
      title: 'Legacy System Modernization',
      description: 'Transform outdated systems into modern, scalable applications'
    },
    {
      icon: '📊',
      title: 'Data Analytics',
      description: 'Business intelligence, data visualization and analytics solutions'
    },
    {
      icon: '🔍',
      title: 'UX/UI Design',
      description: 'User-centric design that enhances usability and engagement'
    },
    {
      icon: '🛒',
      title: 'E-commerce Solutions',
      description: 'Custom online stores and marketplace platforms'
    },
    {
      icon: '🔧',
      title: 'DevOps & CI/CD',
      description: 'Automated workflows for continuous integration and delivery'
    },
    {
      icon: '💡',
      title: 'Technology Consulting',
      description: 'Strategic guidance for digital transformation and technology adoption'
    },
    {
      icon: '📈',
      title: 'Scalability Solutions',
      description: 'Architecture optimization for high-traffic applications'
    },
    {
      icon: '🤝',
      title: 'Dedicated Development Teams',
      description: 'Extended engineering teams that integrate with your business'
    }
  ]

  return (
    <section className="features">
      <div className="features-container">
        <h2>Our Expertise</h2>
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

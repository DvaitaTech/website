import './Features.css'

const Features = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Cloud Infrastructure',
      description: 'AWS, Azure & GCP architecture design, implementation and optimization'
    },
    {
      icon: '🔄',
      title: 'CI/CD Pipelines',
      description: 'Automated build, test and deployment workflows with Jenkins, GitLab & GitHub Actions'
    },
    {
      icon: '🛡️',
      title: 'Security & Compliance',
      description: 'Infrastructure security, compliance automation & vulnerability management'
    },
    {
      icon: '🎯',
      title: 'Kubernetes & Containers',
      description: 'Container orchestration, microservices architecture & service mesh implementation'
    },
    {
      icon: '📊',
      title: 'Monitoring & Observability',
      description: 'Comprehensive monitoring solutions with Prometheus, Grafana & ELK stack'
    },
    {
      icon: '💻',
      title: 'Custom Development',
      description: 'Full-stack development with modern frameworks and cloud-native technologies'
    },
    {
      icon: '🔧',
      title: 'Infrastructure as Code',
      description: 'Automated infrastructure provisioning with Terraform, CloudFormation & Ansible'
    },
    {
      icon: '🔍',
      title: 'Performance Optimization',
      description: 'Application performance monitoring, profiling & optimization'
    },
    {
      icon: '💰',
      title: 'Cost Management',
      description: 'Cloud cost optimization, resource rightsizing & FinOps practices'
    },
    {
      icon: '🔒',
      title: 'Identity & Access Management',
      description: 'IAM policies, role-based access control & SSO implementation'
    },
    {
      icon: '🔄',
      title: 'Database Management',
      description: 'Database optimization, migration & high-availability setup'
    },
    {
      icon: '🌐',
      title: 'Network Architecture',
      description: 'VPC design, load balancing & content delivery optimization'
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile app development'
    },
    {
      icon: '🤖',
      title: 'Automation & Scripts',
      description: 'Custom automation solutions & script development'
    },
    {
      icon: '🔥',
      title: 'Incident Response',
      description: 'On-call support, incident management & post-mortem analysis'
    }
  ]

  return (
    <section className="features">
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
    </section>
  )
}

export default Features

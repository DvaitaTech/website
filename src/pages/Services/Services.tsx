import { useState } from 'react'
import Modal from '../../components/Modal/Modal'
import './Services.css'

interface CaseStudy {
  title: string
  description: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
}

const Services = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)

  const services = [
    {
      title: 'Cloud Infrastructure',
      description: 'Design and implementation of scalable cloud architectures on AWS, Azure, and GCP. Optimize costs and improve reliability.',
      features: ['Infrastructure as Code', 'Cloud Migration', 'Cost Optimization', 'High Availability Design'],
      technologies: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation'],
      caseStudy: {
        title: 'Enterprise Cloud Migration',
        description: 'Successfully migrated a large enterprise from on-premise to cloud, reducing costs by 40%',
        challenge: 'Client was running legacy applications on aging hardware with high maintenance costs and scalability issues.',
        solution: 'Implemented a phased migration strategy using AWS Landing Zone and automated infrastructure deployment with Terraform.',
        results: [
          '40% reduction in infrastructure costs',
          'Improved system reliability from 99.9% to 99.99%',
          'Reduced deployment time from days to hours',
          'Implemented automated disaster recovery'
        ],
        technologies: ['AWS', 'Terraform', 'Docker', 'Jenkins', 'EKS']
      }
    },
    {
      title: 'DevOps Automation',
      description: 'Streamline your development workflow with modern CI/CD pipelines and automation tools.',
      features: ['CI/CD Pipeline Setup', 'Automated Testing', 'Deployment Automation', 'Monitoring & Alerting'],
      technologies: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'ArgoCD', 'Spinnaker'],
      caseStudy: {
        title: 'CI/CD Pipeline Optimization',
        description: 'Reduced deployment time from hours to minutes for a major SaaS provider',
        challenge: 'Client\'s manual deployment process was error-prone and time-consuming, causing frequent production issues.',
        solution: 'Designed and implemented a fully automated CI/CD pipeline with comprehensive testing and deployment strategies.',
        results: [
          'Reduced deployment time from 4 hours to 15 minutes',
          'Zero downtime deployments',
          '90% reduction in deployment-related incidents',
          'Improved developer productivity by 60%'
        ],
        technologies: ['GitHub Actions', 'ArgoCD', 'Kubernetes', 'Jest', 'Cypress']
      }
    },
    {
      title: 'Kubernetes Solutions',
      description: 'Expert container orchestration and microservices architecture implementation.',
      features: ['Cluster Setup & Management', 'Application Containerization', 'Service Mesh Implementation', 'Security Hardening'],
      technologies: ['Kubernetes', 'Docker', 'Istio', 'Helm', 'Prometheus'],
      caseStudy: {
        title: 'Microservices Transformation',
        description: 'Modernized a monolithic application into microservices, improving scalability and reliability',
        challenge: 'Client had a large, monolithic application that was difficult to scale and maintain, causing performance issues during peak loads.',
        solution: 'Designed and implemented a microservices architecture using Kubernetes, breaking down the monolith into smaller, manageable services.',
        results: [
          'Improved application scalability by 300%',
          'Reduced deployment time from days to hours',
          'Increased system uptime from 99.9% to 99.99%',
          'Enabled independent scaling of services, reducing costs by 25%'
        ],
        technologies: ['Kubernetes', 'Docker', 'Istio', 'Helm', 'Prometheus', 'Grafana']
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

            <button 
              className="case-study-button"
              onClick={() => setSelectedCaseStudy(service.caseStudy)}
            >
              View Case Study
            </button>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={!!selectedCaseStudy} 
        onClose={() => setSelectedCaseStudy(null)}
      >
        {selectedCaseStudy && (
          <div className="case-study-modal">
            <h2>{selectedCaseStudy.title}</h2>
            <p className="case-study-description">{selectedCaseStudy.description}</p>
            
            <h3>Challenge</h3>
            <p>{selectedCaseStudy.challenge}</p>
            
            <h3>Solution</h3>
            <p>{selectedCaseStudy.solution}</p>
            
            <h3>Results</h3>
            <ul>
              {selectedCaseStudy.results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
            
            <h3>Technologies Used</h3>
            <div className="tech-tags">
              {selectedCaseStudy.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Services

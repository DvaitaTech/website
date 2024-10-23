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
      caseStudies: [
        {
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
        },
        {
          title: 'Global E-commerce Platform Scaling',
          description: 'Scaled a rapidly growing e-commerce platform to handle 10x traffic increase during peak seasons',
          challenge: 'Client\'s platform struggled with performance issues and downtime during high-traffic events like Black Friday.',
          solution: 'Implemented a multi-region AWS architecture with auto-scaling, caching layers, and serverless components.',
          results: [
            'Achieved 99.999% uptime during peak traffic periods',
            'Reduced average page load time from 3s to 0.8s',
            'Scaled to handle 100,000 concurrent users without performance degradation',
            'Implemented real-time analytics for business insights'
          ],
          technologies: ['AWS', 'Lambda', 'DynamoDB', 'CloudFront', 'ElastiCache']
        }
      ]
    },
    {
      title: 'DevOps Automation',
      description: 'Streamline your development workflow with modern CI/CD pipelines and automation tools.',
      features: ['CI/CD Pipeline Setup', 'Automated Testing', 'Deployment Automation', 'Monitoring & Alerting'],
      technologies: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'ArgoCD', 'Spinnaker'],
      caseStudies: [
        {
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
        },
        {
          title: 'Continuous Deployment for Fintech App',
          description: 'Implemented a robust CD pipeline for a critical financial application, ensuring security and compliance',
          challenge: 'Client needed to increase deployment frequency while maintaining strict security and regulatory compliance.',
          solution: 'Designed a secure CI/CD pipeline with automated security scanning, approval gates, and audit trails.',
          results: [
            'Increased deployment frequency from monthly to daily',
            'Reduced time-to-market for new features by 70%',
            'Achieved 100% compliance with financial industry regulations',
            'Implemented automated rollback mechanisms for zero-downtime deployments'
          ],
          technologies: ['GitLab CI', 'Ansible', 'Vault', 'Aqua Security', 'ELK Stack']
        }
      ]
    },
    {
      title: 'Kubernetes Solutions',
      description: 'Expert container orchestration and microservices architecture implementation.',
      features: ['Cluster Setup & Management', 'Application Containerization', 'Service Mesh Implementation', 'Security Hardening'],
      technologies: ['Kubernetes', 'Docker', 'Istio', 'Helm', 'Prometheus'],
      caseStudies: [
        {
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
        },
        {
          title: 'Global CDN on Kubernetes',
          description: 'Built a high-performance, globally distributed CDN using Kubernetes',
          challenge: 'Client needed a cost-effective, scalable solution to deliver content globally with low latency.',
          solution: 'Designed and implemented a custom CDN using Kubernetes clusters in multiple regions, with intelligent routing and caching.',
          results: [
            'Reduced content delivery latency by 60% globally',
            'Achieved 99.99% availability across all regions',
            'Scaled to handle 1 million requests per second during peak times',
            'Reduced CDN costs by 50% compared to commercial CDN providers'
          ],
          technologies: ['Kubernetes', 'Istio', 'Envoy', 'Prometheus', 'Grafana', 'Terraform']
        }
      ]
    },
    {
      title: 'Data Engineering & Analytics',
      description: 'Build robust data pipelines and analytics solutions to derive actionable insights from your data.',
      features: ['Data Warehouse Design', 'ETL Pipeline Development', 'Real-time Analytics', 'Machine Learning Integration'],
      technologies: ['Apache Spark', 'Airflow', 'Snowflake', 'Databricks', 'Tableau'],
      caseStudies: [
        {
          title: 'Real-time Analytics Platform',
          description: 'Developed a real-time analytics platform for a major retailer, enabling instant business insights',
          challenge: 'Client struggled to make timely decisions due to delayed and inconsistent data across multiple systems.',
          solution: 'Implemented a scalable, real-time data pipeline using Apache Kafka and Spark Streaming, with a Snowflake data warehouse.',
          results: [
            'Reduced data latency from hours to seconds',
            'Increased accuracy of inventory forecasts by 30%',
            'Enabled real-time personalization, boosting conversion rates by 25%',
            'Consolidated data from 20+ sources into a single source of truth'
          ],
          technologies: ['Apache Kafka', 'Spark Streaming', 'Snowflake', 'Airflow', 'Tableau']
        },
        {
          title: 'Predictive Maintenance for Manufacturing',
          description: 'Implemented a predictive maintenance system for a large manufacturing company, reducing downtime and maintenance costs',
          challenge: 'Client faced frequent unexpected equipment failures, leading to costly production delays and high maintenance expenses.',
          solution: 'Developed an IoT-based data collection system and machine learning models to predict equipment failures before they occur.',
          results: [
            'Reduced unplanned downtime by 35%',
            'Decreased maintenance costs by 25%',
            'Improved overall equipment effectiveness (OEE) by 15%',
            'Implemented real-time monitoring dashboard for all production lines'
          ],
          technologies: ['Azure IoT Hub', 'Azure Machine Learning', 'Power BI', 'Apache Spark', 'Databricks']
        }
      ]
    },
    {
      title: 'Security & Compliance',
      description: 'Implement robust security measures and ensure compliance with industry regulations.',
      features: ['Security Audits', 'Compliance Implementation', 'Penetration Testing', 'Security Monitoring'],
      technologies: ['AWS Security Hub', 'Azure Sentinel', 'Splunk', 'Nessus', 'Qualys'],
      caseStudies: [
        {
          title: 'HIPAA Compliance for Healthcare SaaS',
          description: 'Achieved HIPAA compliance for a healthcare SaaS provider, enabling expansion into new markets',
          challenge: 'Client needed to meet strict HIPAA requirements to serve healthcare customers while maintaining system performance.',
          solution: 'Implemented end-to-end encryption, access controls, and comprehensive audit logging while optimizing for performance.',
          results: [
            'Achieved full HIPAA compliance certification',
            'Expanded customer base by 40% in the healthcare sector',
            'Implemented automated compliance checks, reducing audit preparation time by 70%',
            'Enhanced overall system security, preventing several potential data breaches'
          ],
          technologies: ['AWS KMS', 'CloudTrail', 'Vault', 'Prisma Cloud', 'Splunk']
        },
        {
          title: 'Zero Trust Security Implementation',
          description: 'Implemented a zero trust security model for a multinational corporation, enhancing overall security posture',
          challenge: 'Client\'s traditional perimeter-based security was inadequate for their increasingly distributed workforce and cloud-based applications.',
          solution: 'Designed and implemented a comprehensive zero trust architecture, including identity-based access controls, micro-segmentation, and continuous monitoring.',
          results: [
            'Reduced successful security breaches by 90%',
            'Improved visibility into network traffic and user behavior',
            'Enabled secure remote work for all employees',
            'Achieved compliance with multiple international security standards'
          ],
          technologies: ['Azure AD', 'Cisco Duo', 'Palo Alto Networks', 'Splunk SIEM', 'CrowdStrike']
        }
      ]
    },
    {
      title: 'Serverless Architecture',
      description: 'Design and implement scalable, cost-effective serverless solutions for modern applications.',
      features: ['Function-as-a-Service (FaaS)', 'Event-driven Architecture', 'Serverless Databases', 'API Gateway Integration'],
      technologies: ['AWS Lambda', 'Azure Functions', 'Google Cloud Functions', 'DynamoDB', 'API Gateway'],
      caseStudies: [
        {
          title: 'Serverless Image Processing Pipeline',
          description: 'Built a highly scalable, cost-effective image processing solution for a media company',
          challenge: 'Client needed to process millions of user-uploaded images daily with varying workloads and strict budget constraints.',
          solution: 'Designed a serverless architecture using AWS Lambda for image processing and Amazon S3 for storage, with SQS for job queuing.',
          results: [
            'Reduced image processing costs by 60% compared to previous solution',
            'Scaled to handle 10x spikes in upload volume without performance degradation',
            'Decreased average processing time from minutes to seconds',
            'Implemented automatic image optimization, saving 40% in storage costs'
          ],
          technologies: ['AWS Lambda', 'S3', 'SQS', 'DynamoDB', 'CloudFront']
        },
        {
          title: 'Serverless IoT Data Processing',
          description: 'Developed a scalable, serverless solution for processing and analyzing IoT sensor data for a smart city project',
          challenge: 'Client needed to process and analyze data from millions of IoT sensors in real-time, with highly variable workloads.',
          solution: 'Implemented a serverless architecture using AWS IoT Core, Lambda, and Kinesis for data ingestion, processing, and real-time analytics.',
          results: [
            'Scaled to handle data from over 1 million IoT devices',
            'Reduced data processing latency from minutes to seconds',
            'Achieved 99.999% data processing reliability',
            'Implemented real-time anomaly detection, improving city services response time by 50%'
          ],
          technologies: ['AWS IoT Core', 'Lambda', 'Kinesis', 'DynamoDB', 'QuickSight']
        }
      ]
    }
  ]

  return (
    <main className="services-page">
      <article>
        <header>
          <h1>Cloud & DevOps Services</h1>
          <p className="services-intro">
            Comprehensive cloud solutions and DevOps services to transform your business
          </p>
        </header>

        <section className="services-grid" aria-label="Services">
          {services.map((service, index) => (
            <article key={index} className="service-card">
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
                <div className="tech-tags" role="list">
                  {service.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag" role="listitem">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="case-studies">
                <h3>Case Studies</h3>
                {service.caseStudies.map((caseStudy, caseIndex) => (
                  <button 
                    key={caseIndex}
                    className="case-study-button"
                    onClick={() => setSelectedCaseStudy(caseStudy)}
                    aria-label={`View case study: ${caseStudy.title}`}
                  >
                    {caseStudy.title}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </section>
      </article>

      <Modal 
        isOpen={!!selectedCaseStudy} 
        onClose={() => setSelectedCaseStudy(null)}
      >
        {selectedCaseStudy && (
          <article className="case-study-modal">
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
            <div className="tech-tags" role="list">
              {selectedCaseStudy.technologies.map((tech, index) => (
                <span key={index} className="tech-tag" role="listitem">{tech}</span>
              ))}
            </div>
          </article>
        )}
      </Modal>
    </main>
  )
}

export default Services

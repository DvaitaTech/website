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
      title: 'Custom Software Development',
      description: 'Tailored software solutions designed to address your unique business challenges and opportunities.',
      features: ['Web Applications', 'Mobile Development', 'Desktop Software', 'Enterprise Solutions'],
      technologies: ['React', 'Angular', 'Vue.js', 'Node.js', '.NET', 'Java'],
      caseStudies: [
        {
          title: 'Enterprise CRM System',
          description: 'Developed a custom CRM system for a multinational company, increasing sales efficiency by 35%',
          challenge: 'Client was using multiple disconnected systems to manage customer relationships, leading to data silos and inefficient processes.',
          solution: 'Designed and implemented a unified CRM platform tailored to their specific workflow with seamless integration to existing systems.',
          results: [
            '35% increase in sales team efficiency',
            'Consolidated data from 5 legacy systems into a single platform',
            'Improved lead conversion rate by 28%',
            'Reduced customer onboarding time by 60%'
          ],
          technologies: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'Docker']
        },
        {
          title: 'Healthcare Patient Management System',
          description: 'Built a comprehensive patient management system for a network of clinics, improving patient care and operational efficiency',
          challenge: 'Client struggled with paper-based processes and basic electronic records that didn\'t support their workflow or regulatory requirements.',
          solution: 'Developed a secure, HIPAA-compliant patient management system with scheduling, electronic health records, and billing integration.',
          results: [
            'Reduced administrative workload by 40%',
            'Decreased patient wait times by 25%',
            'Improved billing accuracy by 30%',
            'Enhanced overall patient satisfaction scores by 45%'
          ],
          technologies: ['React', '.NET Core', 'SQL Server', 'Azure', 'FHIR']
        }
      ]
    },
    {
      title: 'Web Application Development',
      description: 'Modern, responsive, and scalable web applications built with cutting-edge technologies.',
      features: ['Progressive Web Apps', 'SPA Development', 'E-commerce Platforms', 'CMS Solutions'],
      technologies: ['React', 'Angular', 'Next.js', 'Node.js', 'PHP', 'Python'],
      caseStudies: [
        {
          title: 'E-commerce Platform Redesign',
          description: 'Completely redesigned and rebuilt an e-commerce platform, increasing conversions by 40%',
          challenge: 'Client\'s outdated online store had poor performance, low conversion rates, and couldn\'t support their growing product catalog.',
          solution: 'Developed a modern e-commerce platform with advanced search, personalization, and mobile-first design.',
          results: [
            '40% increase in conversion rate',
            '65% improvement in page load speed',
            '75% increase in mobile orders',
            'Reduced cart abandonment by 30%'
          ],
          technologies: ['Next.js', 'Node.js', 'MongoDB', 'Redux', 'Stripe API']
        },
        {
          title: 'Financial Dashboard Application',
          description: 'Created a real-time financial dashboard for investment professionals, improving decision-making capabilities',
          challenge: 'Client needed a sophisticated dashboard to consolidate financial data from multiple sources for quick analysis and decision-making.',
          solution: 'Built a real-time dashboard with interactive data visualization, custom reports, and algorithm-based insights.',
          results: [
            'Reduced data analysis time by 75%',
            'Increased investment team productivity by 30%',
            'Improved accuracy of financial forecasts by 25%',
            'Enabled real-time collaboration between team members'
          ],
          technologies: ['React', 'D3.js', 'Node.js', 'WebSockets', 'AWS']
        }
      ]
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.',
      features: ['Native iOS & Android', 'Cross-platform Development', 'Progressive Web Apps', 'App Store Optimization'],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Firebase'],
      caseStudies: [
        {
          title: 'Fitness Tracking App',
          description: 'Developed a feature-rich fitness app with social features, resulting in 1M+ downloads',
          challenge: 'Client wanted to enter the competitive fitness app market with innovative features and superior user experience.',
          solution: 'Built a cross-platform app with real-time tracking, social sharing, and gamification elements.',
          results: [
            'Over 1 million downloads in the first year',
            '4.8-star average rating across app stores',
            '35% higher user retention than industry average',
            'Successfully monetized through premium subscription model'
          ],
          technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB', 'AWS']
        },
        {
          title: 'Field Service Management App',
          description: 'Created a mobile solution for field technicians, increasing operational efficiency by 45%',
          challenge: 'Client\'s field service technicians were using paper-based processes, causing delays and data accuracy issues.',
          solution: 'Developed a native mobile app with offline capabilities, real-time updates, and integrated mapping and scheduling.',
          results: [
            '45% increase in technician productivity',
            'Reduced paperwork time by 90%',
            'Improved first-time fix rate by 25%',
            'Enhanced customer satisfaction with real-time updates'
          ],
          technologies: ['Swift', 'Kotlin', 'Node.js', 'PostgreSQL', 'Google Maps API']
        }
      ]
    },
    {
      title: 'Cloud Infrastructure & DevOps',
      description: 'Modern cloud architecture and DevOps practices to optimize your applications for performance, scalability, and reliability.',
      features: ['Cloud Migration', 'Infrastructure as Code', 'CI/CD Pipelines', 'Containerization'],
      technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform'],
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
          title: 'DevOps Transformation',
          description: 'Transformed the development workflow for a software company, accelerating time-to-market by 60%',
          challenge: 'Client\'s development team faced slow release cycles, manual processes, and frequent production issues.',
          solution: 'Implemented modern DevOps practices including CI/CD pipelines, infrastructure as code, and comprehensive monitoring.',
          results: [
            '60% faster time-to-market for new features',
            'Reduced deployment failures by 75%',
            'Decreased mean time to recovery (MTTR) from hours to minutes',
            'Improved developer satisfaction and reduced burnout'
          ],
          technologies: ['Azure DevOps', 'Kubernetes', 'Docker', 'Terraform', 'Prometheus']
        }
      ]
    },
    {
      title: 'AI & Machine Learning',
      description: 'Cutting-edge AI and machine learning solutions to unlock insights, automate processes, and create intelligent applications.',
      features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'Recommendation Systems'],
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Python', 'Hugging Face', 'AWS SageMaker'],
      caseStudies: [
        {
          title: 'Customer Sentiment Analysis',
          description: 'Built an NLP system to analyze customer feedback, increasing response time to issues by 80%',
          challenge: 'Client was overwhelmed with customer feedback across multiple channels and couldn\'t identify critical issues quickly.',
          solution: 'Developed a machine learning system to categorize and analyze sentiment across all customer communications.',
          results: [
            '80% faster response to critical customer issues',
            'Identified previously unknown product issues worth fixing',
            'Improved overall customer satisfaction by 25%',
            'Reduced customer support workload by 30%'
          ],
          technologies: ['Python', 'TensorFlow', 'BERT', 'AWS SageMaker', 'Elasticsearch']
        },
        {
          title: 'Inventory Optimization AI',
          description: 'Created a predictive inventory management system for a retail chain, reducing costs by $2.5M annually',
          challenge: 'Client struggled with inventory issues - both stockouts of popular items and excess inventory of slow-moving products.',
          solution: 'Built a machine learning system to predict optimal inventory levels based on multiple factors including seasonality, promotions, and trends.',
          results: [
            '$2.5M annual savings from reduced excess inventory',
            '35% reduction in stockouts',
            '20% decrease in warehouse space requirements',
            'Improved cash flow through optimized purchasing'
          ],
          technologies: ['Python', 'PyTorch', 'MySQL', 'Power BI', 'Azure ML']
        }
      ]
    },
    {
      title: 'Data Engineering & Analytics',
      description: 'Build robust data pipelines and analytics solutions to derive actionable insights from your data.',
      features: ['Data Warehouse Design', 'ETL Pipeline Development', 'Real-time Analytics', 'Business Intelligence'],
      technologies: ['Apache Spark', 'Airflow', 'Snowflake', 'Databricks', 'Tableau', 'Power BI'],
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
          title: 'Business Intelligence Dashboard',
          description: 'Created comprehensive business intelligence dashboards for a multinational corporation',
          challenge: 'Client lacked visibility into key performance indicators across their global operations.',
          solution: 'Designed and implemented a suite of interactive dashboards with drill-down capabilities and automated reporting.',
          results: [
            'Provided executives with real-time visibility into global operations',
            'Saved 20+ hours per week previously spent on manual reporting',
            'Identified cost-saving opportunities worth $1.8M annually',
            'Improved strategic decision making with data-driven insights'
          ],
          technologies: ['Power BI', 'SQL Server', 'Azure Data Factory', 'Azure Analysis Services']
        }
      ]
    }
  ]

  return (
    <main className="services-page">
      <article>
        <header>
          <h1>Software Consulting Services</h1>
          <p className="services-intro">
            Comprehensive software solutions to transform your business and drive innovation
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

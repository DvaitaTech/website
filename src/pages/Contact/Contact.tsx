import ContactForm from '../../components/Contact/ContactForm'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Get in Touch</h1>
      <p>Let's discuss how we can help transform your DevOps journey</p>
      
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-item">
            <h3>Email</h3>
            <p>contact@dvaitatech.com</p>
          </div>
          <div className="info-item">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="info-item">
            <h3>Address</h3>
            <p>123 Tech Street<br />San Francisco, CA 94105</p>
          </div>
        </div>
        
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact

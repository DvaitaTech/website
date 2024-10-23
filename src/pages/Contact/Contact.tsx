import ContactForm from '../../components/Contact/ContactForm'
import './Contact.css'

const Contact = () => {
  return (
    <main className="contact-page">
      <article>
        <header>
          <h1>Contact Dvaita Technologies</h1>
          <p>Let's discuss how we can help transform your DevOps journey</p>
        </header>
        
        <div className="contact-container">
          <section className="contact-info" aria-label="Contact Information">
            <h2>Contact Information</h2>
            <div className="info-item">
              <h3>Email</h3>
              <p>
                <a href="mailto:contact@dvaitatech.com">contact@dvaitatech.com</a>
              </p>
            </div>
            <div className="info-item">
              <h3>Phone</h3>
              <p>
                <a href="tel:+919892356631">+91 9892356631</a>
              </p>
            </div>
            <div className="info-item">
              <h3>Address</h3>
              <address>
                Dvaita Technologies<br />
                BKC, F-Block<br />
                Mumbai, India
              </address>
            </div>
          </section>
          
          <section aria-label="Contact Form">
            <ContactForm />
          </section>
        </div>
      </article>
    </main>
  )
}

export default Contact

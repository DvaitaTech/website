import ContactForm from '../../components/Contact/ContactForm'
import './Contact.css'

const Contact = () => {
  return (
    <main className="contact-page">
      <article>
        <header className="contact-hero">
          <h1>Strategic Partnership Inquiry</h1>
          <p>Connect with our enterprise technology experts to discuss your digital transformation initiatives</p>
        </header>
        
        <div className="contact-container">
          <section className="contact-info" aria-label="Office Location">
            <h2>Global Headquarters</h2>
            
            <div className="info-item">
              <h3>Corporate Office</h3>
              <address>
                Dvaita Technologies<br />
                Bandra Kurla Complex, F-Block<br />
                Mumbai, Maharashtra 400051<br />
                India
              </address>
              <p>
                <a href="tel:+919892356631">+91 9892356631</a>
              </p>
            </div>
            
            <div className="info-item">
              <h3>Enterprise Communications</h3>
              <p>
                <a href="mailto:enterprise@dvaitatech.com">enterprise@dvaitatech.com</a>
              </p>
              <p>
                <a href="mailto:partnerships@dvaitatech.com">partnerships@dvaitatech.com</a>
              </p>
            </div>
          </section>
          
          <section className="contact-form-section" aria-label="Strategic Consultation Request">
            <h2>Request Strategic Consultation</h2>
            <p>Complete the form below to schedule a consultation with our enterprise technology experts</p>
            <ContactForm />
          </section>
        </div>
      </article>
    </main>
  )
}

export default Contact

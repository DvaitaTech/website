import { EmailData } from '@sendgrid/helpers/classes/email-address'
import sgMail from '@sendgrid/mail'

interface ContactFormData {
  name: string
  email: string
  company: string
  message: string
}

export async function onRequestPost({ request, env }) {
  try {
    // Parse the request body
    const data: ContactFormData = await request.json()
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Configure SendGrid
    sgMail.setApiKey(env.SENDGRID_API_KEY)

    // Prepare email data
    const msg = {
      to: 'contact@dvaitatech.com', // Replace with your email
      from: 'noreply@dvaitatech.com', // Replace with your verified sender
      subject: `New Contact Form Submission from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Message: ${data.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Company:</strong> ${data.company}</p>
<p><strong>Message:</strong> ${data.message}</p>
      `
    }

    // Send email
    await sgMail.send(msg)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

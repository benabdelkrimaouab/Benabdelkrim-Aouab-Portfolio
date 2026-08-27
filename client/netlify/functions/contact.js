import nodemailer from 'nodemailer';

// Same logic as server/routes/contact.js, adapted to Netlify's Functions
// format (a single handler instead of an Express router) so the contact
// form works with no separate backend to host.
//
// Note: the in-memory rate limiter from the Express version is left out
// here on purpose. Netlify Functions are stateless between invocations —
// each request can hit a fresh container — so an in-memory Map can't
// reliably track submissions across requests. The honeypot field still
// works fine since it just inspects a single request.

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body.' }) };
  }

  const { name, email, phone, message, company } = data;

  // Honeypot: a hidden field named "company" that only bots auto-fill.
  // Respond with a generic success so bots don't learn the field is checked.
  if (company) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Message sent successfully.' }),
    };
  }

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Name, email, and message are required.' }),
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Message sent successfully.' }),
    };
  } catch (err) {
    console.error('Error sending email:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message. Please try again later.' }),
    };
  }
};

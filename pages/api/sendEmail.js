import nodemailer from 'nodemailer';

export default async function sendEmail(to, subject,textBody, htmlBody) {
  // Create a transporter using your email service provider details
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rajan23024@gmail.com',
      pass: 'mfyinyfaqebthpsw',
    },
  });

  try {
    // Send the email
    let result = await transporter.sendMail({
      from: 'rajan23024@gmail.com',
      to,
      subject,
      text: textBody,
      html: htmlBody
    });

    console.log('Email sent successfully', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

import nodemailer from 'nodemailer';

export default async function sendEmail(to, subject, body) {
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
      // text: body,
      html: `
      <h1>New Signup Details</h1>
      <table>
        <tr>
          <td><strong>Name:</strong></td>
          <td>${body.name}</td>
        </tr>
        <tr>
          <td><strong>Mobile Number:</strong></td>
          <td>${body.mobileNumber}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>${body.email}</td>
        </tr>
        <tr>
          <td><strong>Gender:</strong></td>
          <td>${body.gender}</td>
        </tr>
        <tr>
          <td><strong>Standard:</strong></td>
          <td>${body.standard}</td>
        </tr>
        <tr>
          <td><strong>Date of Birth:</strong></td>
          <td>${body.dob}</td>
        </tr>
        <tr>
          <td><strong>Medium:</strong></td>
          <td>${body.medium}</td>
        </tr>
        <tr>
          <td><strong>School or College:</strong></td>
          <td>${body.schoolorCollage}</td>
        </tr>
        <tr>
          <td><strong>Address:</strong></td>
          <td>${body.address}</td>
        </tr>
      </table>
    `
    });

    console.log('Email sent successfully', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

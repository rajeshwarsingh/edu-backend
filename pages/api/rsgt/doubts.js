import connectToDatabase from '../db';
import sendEmail from '../sendEmail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { teacher = '', subject = '', title = '', description = '', name = "", mobile = "" } = req.body;
  const body = { teacher, subject, title, description, name, mobile };
  try {
    const db = await connectToDatabase();
    const collection = db.collection('doubt');

    // Store the doubt data in the database
    await collection.insertOne(body);

    // Send the email with the doubt details
    const subject = 'Doubt Details';
    // const body = `Name: ${name}\nEmail: ${email}\nPassword: ${mobileNumber}`;
    const htmlBody = getHtmlBody(body)
    await sendEmail('freshmorning1462@gmail.com', subject, null, htmlBody);

    res.status(201).json({ message: 'doubt successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred' });
  }
}


function getHtmlBody(body) {
  return `
  <h1>Student doubt</h1>
  <table>
  <tr>
  <td><strong>Student Name:</strong></td>
  <td>${body.name}</td>
</tr>
<tr>
      <td><strong>Mobile:</strong></td>
      <td>${body.mobile}</td>
    </tr>
    <tr>
      <td><strong>teacher:</strong></td>
      <td>${body.teacher}</td>
    </tr>
    <tr>
      <td><strong>subject:</strong></td>
      <td>${body.subject}</td>
    </tr>
    <tr>
      <td><strong>title:</strong></td>
      <td>${body.title}</td>
    </tr>
    <tr>
      <td><strong>description:</strong></td>
      <td>${body.description}</td>
    </tr>
  </table>
`
}
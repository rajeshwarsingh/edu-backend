import connectToDatabase from '../db';
import sendEmail from '../sendEmail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { firstName = '',lastName = '', mobileNumber = '', email = '', gender = '', standard = '', dob = '', medium = '', schoolorCollage = '', address = '' } = req.body;
  const body = { firstName, lastName, mobileNumber, email, gender, standard, dob, medium, schoolorCollage, address };
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    // Store the signup data in the database
    await collection.insertOne(body);
    
    // Send the email with the signup details
    const subject = 'Student doubt';
    // const body = `Name: ${name}\nEmail: ${email}\nPassword: ${mobileNumber}`;
    const htmlBody =getHtmlBody(body)
    await sendEmail('freshmorning1462@gmail.com', subject,null, htmlBody);

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred' });
  }
}


function getHtmlBody(body){
  return `
  <h1>New Signup Details</h1>
  <table>
    <tr>
      <td><strong>First Name:</strong></td>
      <td>${body?.firstName}</td>
    </tr>
    <tr>
      <td><strong>Last Name:</strong></td>
      <td>${body?.lastName}</td>
    </tr>
    <tr>
      <td><strong>Mobile Number:</strong></td>
      <td>${body?.mobileNumber}</td>
    </tr>
    <tr>
      <td><strong>Email:</strong></td>
      <td>${body?.email}</td>
    </tr>
    <tr>
      <td><strong>Gender:</strong></td>
      <td>${body?.gender}</td>
    </tr>
    <tr>
      <td><strong>Standard:</strong></td>
      <td>${body?.standard}</td>
    </tr>
    <tr>
      <td><strong>Date of Birth:</strong></td>
      <td>${body?.dob}</td>
    </tr>
    <tr>
      <td><strong>Medium:</strong></td>
      <td>${body?.medium}</td>
    </tr>
    <tr>
      <td><strong>School or College:</strong></td>
      <td>${body?.schoolorCollage}</td>
    </tr>
    <tr>
      <td><strong>Address:</strong></td>
      <td>${body?.address}</td>
    </tr>
  </table>
`
}
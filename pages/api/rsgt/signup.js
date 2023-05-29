import connectToDatabase from '../db';
import sendEmail from '../sendEmail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { name = '', mobileNumber = '', email = '', gender = '', standards = '', dob = '', medium = '', schoolorCollage = '', address = '' } = req.body;
  const body = { name, mobileNumber, email, gender, standards, dob, medium, schoolorCollage, address };
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    // Store the signup data in the database
    await collection.insertOne(body);
    
    // Send the email with the signup details
    const subject = 'Signup Details';
    // const body = `Name: ${name}\nEmail: ${email}\nPassword: ${mobileNumber}`;

    await sendEmail('freshmorning1462@gmail.com', subject, body);

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred' });
  }
}
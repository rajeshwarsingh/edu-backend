import { MongoClient } from 'mongodb';
import connectToDatabase from '../db';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase();
      const collection = db.collection('faculty');
      const teachers = await collection.aggregate([{ $sample: { size: 20 } }]).toArray();
      return res.status(200).json(teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      res.status(500).json({ message: 'Error fetching teachers' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;

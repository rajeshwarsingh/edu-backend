import { MongoClient } from 'mongodb';
import connectToDatabase from '../db';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase();
      const collection = db.collection('questions');
      const questions = await collection.aggregate([{ $sample: { size: 20 } }]).toArray();
      return res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ message: 'Error fetching questions' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;

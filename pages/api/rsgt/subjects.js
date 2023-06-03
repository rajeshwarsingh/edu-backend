import { MongoClient } from 'mongodb';
import connectToDatabase from '../db';

const sub= [
  {"name":"math"},
  {"name":"science"},
  {"name":"JEE"},
  {"name":"CET"},
];
async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase();
      const collection = db.collection('subjects');
      const subjects = await collection.aggregate([{ $sample: { size: 20 } }]).toArray();
      return res.status(200).json(subjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      res.status(500).json({ message: 'Error fetching subjects' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;

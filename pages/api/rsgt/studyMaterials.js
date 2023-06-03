import { MongoClient } from 'mongodb';
import connectToDatabase from '../db';

async function handler(req, res) {

  const {std='VIII'} = req.query;
  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase();
      const collection = db.collection('studyMaterial');
      const studyMaterial = await collection.aggregate([
        { $match: { std: std } },
        { $limit: 5 }
      ]).toArray();
      return res.status(200).json(studyMaterial);
    } catch (error) {
      console.error('Error fetching studyMaterial:', error);
      res.status(500).json({ message: 'Error fetching studyMaterial' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;

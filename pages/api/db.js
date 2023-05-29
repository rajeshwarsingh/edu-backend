import { MongoClient } from 'mongodb';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect('mongodb+srv://Akbar23024:Akbar23024@cluster0.hb7na.mongodb.net/rsgt?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('rsgt');
  cachedDb = db;

  return db;
}

export default connectToDatabase;

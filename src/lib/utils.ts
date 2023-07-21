import { MongoClient, ServerApiVersion } from 'mongodb';
import config from '../../config/default';
import { userDoc } from '../modules/user';
import User from '../modules/user';

export const connectDB = async (dbName: string) => {
  let db;
  const client: MongoClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    db = client.db(dbName);

    await db.command({ ping: 1 });

    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.log(error);
  }
  return db;
};

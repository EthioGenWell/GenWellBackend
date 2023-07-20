import { MongoClient, ServerApiVersion, type MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (dbName: string) => {
  const USERNAME = process.env.MONGO_USERNAME;
  const PASSWORD = process.env.MONGO_PASSWORD;
  const HOST = process.env.MONGO_DB_HOST;

  const uri =
    'mongodb+srv://' + USERNAME + ':' + PASSWORD + '@' + HOST + '/?retryWrites=true&w=majority';

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  export const client: MongoClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(dbName).command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.log(error.message);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
import { MongoClient, ServerApiVersion } from 'mongodb';
import config from '../../config/default';

export const connectDB = async (dbName: string) => {
  const USERNAME = config.db.username;
  const PASSWORD = config.db.password;
  const HOST = config.db.host;
  let db;

  const uri =
    'mongodb+srv://' + USERNAME + ':' + PASSWORD + '@' + HOST + '/?retryWrites=true&w=majority';

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client: MongoClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    db = client.db(dbName);

    await db.command({ ping: 1 });
    // Send a ping to confirm a successful connection
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.log(error);
  }
  return db;
};

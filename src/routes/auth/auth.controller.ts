import { Request, Response } from 'express';
import { connectDB } from '../../lib/utils';
import { MongoClient } from 'mongodb';
import config from '../../../config/default';

export async function htmlRegisterUser(req: Request, res: Response) {
  const dbName = config.db.dbName;

  const client: MongoClient = await connectDB(dbName);
  const users = client.collection('Users');
  const user = req.body;

  try {
    const index = await users.indexExists('email_1');
    if (!index) {
      await collection.createIndex({ email: 1 }, { unique: true });
    }

    const result = await users.insertOne(user);
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

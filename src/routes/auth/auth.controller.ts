import { Request, Response } from 'express';
import { connectDB } from '../../lib/utils';
import config from '../../../config/default';

export async function htmlRegisterUser(req: Request, res: Response) {
  const dbName: string = config.db.dbName || '';

  try {
    const db = await connectDB(dbName);
    const users = db?.collection('Users');
    const user = req.body;
    console.log(user);

    const index = await users?.indexExists('email_1');
    if (!index) {
      await users?.createIndex({ email: 1 }, { unique: true });
    }

    const result = await users?.insertOne(user);
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    return res.status(404).json({ success: false, message: error });
  }
}

import mongoose, { Document } from 'mongoose';

export interface userDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('Users', userSchema);

export default User;

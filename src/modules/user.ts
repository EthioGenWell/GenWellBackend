import mongoose, { Document } from 'mongoose';

export interface userDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password:{type: String, required: true} 
});

const User = mongoose.model('Users', userSchema);

export default User;

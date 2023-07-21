import mongoose, { Document, Schema } from 'mongoose';


export interface userDoc extends Document {
    
    email: string;
    password: String
  }

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
    
  });

const User=  mongoose.model("Users", userSchema);

module.exports = User;
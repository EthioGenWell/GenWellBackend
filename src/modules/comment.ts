import mongoose,{ Document, Model, model, Schema } from 'mongoose';
import { userDoc } from './user';

export interface commentDoc {
  body: string;
  author: userDoc['_id']; // Reference to the User who posted the comment
  upvotes: number;
  downvotes: number;
  // Other properties related to the comment
}



const commentSchema = new mongoose.Schema({
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    // Other properties related to the comment
  });
  
  export const Comment =mongoose.model('Comments', commentSchema);

import mongoose,{ Document, Model, model, Schema } from 'mongoose';



import { commentDoc } from './comment';
import { userDoc } from './user';

export interface IQuestion {
  body: string;
  author: userDoc['_id']; // Reference to the User who posted the question
  comments: commentDoc[][]; // Array of references to the Comments on this question
  // Other properties related to the question
}

// export interface IQuestionModel extends Model<IQuestion> {
//   // Add any static methods if needed
// }

const questionSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  // Other properties related to the question
});

export const Question =mongoose.model('Questions', questionSchema);

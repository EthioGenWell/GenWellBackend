import { Request, Response } from 'express';
import { Question } from '../../modules/question';
import { Comment } from '../../modules/comment';
import { userDoc } from '@/modules/user';

declare global {
  namespace Express {
    interface Request {
      user: userDoc
    }
  }
}


// POST /api/questions
export async function createQuestion(req: Request, res: Response) {
  const { body } = req.body;

  try {
    // Create a new question
    const currentUser:any = req.user;
    //console.log(req);
    
    const question = await Question.create({ body, author: currentUser._id });

    res.status(201).json({ success: true, message: 'Question posted successfully', question });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create question' });
  }
}

// POST /api/questions/:questionId/comments
export async function addComment(req: Request, res: Response) {
  const { questionId } = req.params;
  const { body } = req.body;

  try {
    // Find the question to which the comment will be added
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }

    // Create a new comment
    const currentUser:any = req.user;
    const comment = await Comment.create({ body, author: currentUser._id });

    // Add the comment to the question's comments array
    question.comments.push(comment._id);
    await question.save();

    res.status(201).json({ success: true, message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add comment' });
  }
}

// POST /api/questions/:questionId/comments/:commentId/upvote
export async function addUpvote(req: Request, res: Response) {
  const { commentId } = req.params;

  try {
    // Find the comment to upvote
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }

    // Increment upvote count
    comment.upvotes += 1;
    await comment.save();

    res.json({ success: true, message: 'Comment upvoted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to upvote comment' });
  }
}


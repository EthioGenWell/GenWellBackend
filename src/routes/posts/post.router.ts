import express from 'express';
import { createQuestion, addComment, addUpvote, addDownvote } from './post.controller';
//import { authenticateUser, } from '../auth/auth.middleware';
//import { validateToken } from '../../modules/JWT';
const {validateToken}= require("../../modules/JWT")

const questionRouter = express.Router();

// Middleware to authenticate user for protected routes
//questionRouter.use(validateToken);

// POST /api/questions
questionRouter.post('/', createQuestion);

// POST /api/questions/:questionId/comments
questionRouter.post('/:questionId/comments', validateToken, addComment);

// POST /api/questions/:questionId/comments/:commentId/upvote
questionRouter.post('/:questionId/comments/:commentId/upvote',validateToken, addUpvote);

// POST /api/questions/:questionId/comments/:commentId/downvote
questionRouter.post('/:questionId/comments/:commentId/downvote',validateToken, addDownvote);

export default questionRouter;

import express from 'express';
import { htmlRegisterUser } from './auth.controller';
import { htmlLoginUser } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/signup', htmlRegisterUser);
authRouter.post('/login', htmlLoginUser);

export default authRouter;

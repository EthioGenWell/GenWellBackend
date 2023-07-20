import express from 'express';
import { htmlRegisterUser } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/signup', htmlRegisterUser);

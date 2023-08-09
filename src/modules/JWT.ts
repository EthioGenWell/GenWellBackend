const {sign, verify} = require("jsonwebtoken");
import { NextFunction, Request, Response } from 'express';
import { userDoc } from './user';

declare global {
    namespace Express {
      interface Request {
        cookies: { [key: string]: string };
        authenticated?: boolean;
      }
    }
  }

const createTokens= (user: userDoc)=>{
    

    const accessToken= sign(
        
        {email:user.email, _id: user._id}, 
        "a secret to be replaced by dotenv"
        );

        return accessToken;
};

const validateToken= (req: Request,res: Response,next: NextFunction)=>{

    const accessToken = req.cookies['access-token'] 

  if (!accessToken) {
    return res.status(401).json({ success: false, error: 'Access token missing' });
  }

  try {
    const validToken= verify(accessToken, "a secret to be replaced by dotenv")
    if (validToken)
    {         
        req.user= validToken
        req.authenticated= true
    return next();
  }
  } catch (error) {
    return res.status(400).json({error:error})
  }
}

module.exports ={createTokens, validateToken};
import { Request, Response } from 'express';
import { userDoc } from '../../modules/user';
import User from '../../modules/user';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export async function htmlRegisterUser(req: Request, res: Response) {
  const { email, password } = req.body;

  User.find({ email: email })
    .then(async (foundUser) => {
      if (Array.isArray(foundUser) && foundUser.length === 0) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({
          email: email,
          password: hashedPassword,
        });
        await user.save();
        res.status(200).json({ success: true, message: 'User created successfully' });
      } else {
        res.status(400).json({ success: false, error: 'user already exists' });
      }
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(404).json({ success: false, error: err });
    });
}


export async function htmlLoginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  User.find({ email: email })
    .then(async (foundUser) => {
      if (Array.isArray(foundUser) && foundUser.length === 0) {
        
        //user doesnot exist
        res.status(400).json({ success: false, error: 'user does not exist' });
        

      } else {
        const storedHashedPassword = foundUser[0].password;
                    bcrypt.compare(password, storedHashedPassword, (err: Error, result:boolean) => {
                        if (err || !result) {
                            // Invalid login credentials
                            res.status(400).json({success: false, error: "password didnt match"})
                        } else {
                            // Valid login credentials
                            res.json({success: true })
                        }
                      });
      }
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(404).json({ success: false, error: err });
    });
}


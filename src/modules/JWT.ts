const {sign, verify} = require("jsonwebtoken");
import { userDoc } from './user';



const createTokens= (user: userDoc)=>{
    const accessToken= sign(
        {email:user.email}, 
        "a secret to be replaced by dotenv"
        );

        return accessToken;
};

module.exports ={createTokens};
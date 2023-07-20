
import express, { Request, Response } from 'express';
const app= express();
const bcrypt= require("bcrypt")
const mongoose = require("mongoose");

const User= require("./modules/user")
import { userDoc } from "./modules/user"

app.use(express.json());
mongoose.connect("mongodb://localhost/EthioGenWell", { useNewUrlParser: true });

app.post("/register", (req : Request,res : Response)=>{
    
    //wrote a registration code to test the login

    const {email, password}= req.body

    User.find({ email: email })
        .then (async(foundUser: userDoc | null ) => {
            if(Array.isArray(foundUser) && foundUser.length === 0){
                    const hashedPassword = bcrypt.hashSync(password, 10);
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                    })
                    await user.save();
                    res.status(200).json({ message: "User created successfully" });
            }
            
            else {
                
                res.status(400).json({error: "user already exists"})
            }
        })
        .catch((err:Error) => {
            console.log(err);
        })

});

app.post('/login', (req: Request, res: Response) => {
    
    // const email = req.body.email;
    // const password = req.body.password;

    // User.find({ email: email })
    //     .then((foundUser) => {
    //         if (foundUser.length === 0) {
    //             res.status(400).json({error: "user doesnt exist"})
    //             res.redirect('/login');
    //         } else {
    //             const storedHashedPassword = foundUser[0].password;
    //             bcrypt.compare(password, storedHashedPassword, (err, result) => {
    //                 if (err || !result) {
    //                     // Invalid login credentials, redirect to login page
    //                     res.status(400).json({error: "password didnt match"})
    //                     res.redirect('/login');
    //                 } else {
    //                     // Valid login credentials
    //                     res.json("Logged in")
    //                 }
    //             });
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });


  });

app.post("/profile", (req : Request,res : Response)=>{
    res.json("profile");
});


app.listen(3000,()=>{
    console.log("app is running on port 3000");
    
})

import express, { Request, Response } from 'express';
const app= express();
const bcrypt= require("bcrypt")

app.use(express.json());


app.post("/register", (req : Request,res : Response)=>{
    res.json("register");
});

app.post('/login', (req: Request, res: Response) => {
    res.json('login');
  });

app.post("/profile", (req : Request,res : Response)=>{
    res.json("profile");
});


app.listen(3000,()=>{
    console.log("app is running on port 3000");
    
})
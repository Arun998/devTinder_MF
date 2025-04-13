const express = require("express");
const bcrypt = require("bcrypt");
const User = require('../models/user');
const { validateUserSchema } = require('../utils/validator');

const authRouter = express.Router();

authRouter.post('/signup',async (req,res)=>{

    // adding data from post man request
    
    const { firstName, lastName, emailId, password,age,gender} = req.body;

    const passwordHash = await bcrypt.hash(password,10); // encrypt the password

    const user = new User({
        firstName,
        lastName,
        emailId,
        password : passwordHash,
        age,
        gender
    });

    try{
        validateUserSchema(req);
        await user.save();
        res.send("user created sucessfully");
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
});

// login user

authRouter.post('/login',async(req,res)=>{

    const { emailId , password} = req.body;

    const user = await User.findOne({emailId: emailId});

    try{
        if(!user){
            throw new Error("user not exists")
        }
        const isPasswordValid = await user.validatePassword(password)// comparing the password
        if(!isPasswordValid){
            res.clearCookie("token",{ path: "/" })
            res.send("invalid credentials")
        }
        else{
            const token = await user.getJWT();
            res.cookie("token", token) // we can expire cookie as well
            res.send(`${user.firstName} logged in sucessfully`)
        }

    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }


});


module.exports = authRouter;

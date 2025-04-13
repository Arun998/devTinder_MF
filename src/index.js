const express = require('express');
const routes = require('./routes');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user')
const { validateUserSchema } = require('./utils/validator');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth')

// express json middleware
app.use(express.json());
app.use(cookieParser());

app.post('/signup',async (req,res)=>{

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

app.post('/login',async(req,res)=>{

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

// get user profile

app.get('/profile',userAuth,async(req,res)=>{
    try{
        const profileData = req.user;
        res.send(profileData)
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
   
})
// get user from particular email id 
app.get('/user',async(req,res)=>{

    try{
        const userEmail = await User.find({emailId : req.body.emailId})

        res.send(userEmail)
    }
    catch (err){
        res.status(400).send("something went wrong");
    }
   
})

// get all users documents from User collection 

app.get('/feed',async(req,res)=>{
    try{
        // give empty filter in find to get all the users 
        const users = await User.find({});
        
        res.send(users)
    }
    catch(err){
        res.status(400).send("something went wrong")
    }
});

// delete the user based on userId;

app.delete('/user', async(req,res)=>{
    try{
        console.log(req.body.emailId) // user id is the _id in dataBase
        // delete the user based on Id
        // const userId = await User.findByIdAndDelete(req.body.userId); 

        // delete the user based on emailId;
        const emailId = await User.findOneAndDelete({emailId : req.body.emailId})

        res.send('user deleted sucesfully')
    }
    catch(err){
        res.status(400).send("something went wrong")
    }
});

// update the user based on userId and emailID;

app.patch('/user',async(req,res)=>{
    try{
        // updating user based on userId;
        // const userId = await User.findByIdAndUpdate(req.body.userId,req.body)

        // update user based on emailId
        const userId = await User.findOneAndUpdate({emailId : req.body.emailId},req.body)
        if(!userId){
            throw new Error("invalid")
        }
        res.send("user updated sucessfully")
    }
    catch(err){
        res.status(400).send("something went wrong 🤗")
    }
})

connectDB().then(()=>{
    console.log("Connected to database");
    app.listen(2000,()=>{
        console.log(`Server is running on port ${2000}`);
    })
}).catch((err)=>{
    console.log("Error connecting to database",err);
}) ;


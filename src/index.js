const express = require('express');
const routes = require('./routes');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user')

// express json middleware
app.use(express.json());

app.post('/signup',async (req,res)=>{

    // adding data from post man request
    const user = new User(req.body);

    try{
        await user.save();
        res.send("user created sucessfully");
    }
    catch(err){
        res.status(400).send("something Went Wrong" + err.message)
    }
        

});

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
})

connectDB().then(()=>{
    console.log("Connected to database");
    app.listen(2000,()=>{
        console.log(`Server is running on port ${2000}`);
    })
}).catch((err)=>{
    console.log("Error connecting to database",err);
}) ;


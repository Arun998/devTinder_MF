const express = require('express');
const routes = require('./routes');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user')

app.post('/signup',async (req,res)=>{
    const user = new User({
        firstName : "Arun",
        lastName : "k",
        emailId : "arun.k@gmail.com",
        password : "****",
        age : 18,
        gender : "male"

    });

    try{
        await user.save();
        res.send("user created sucessfully");
    }
    catch(err){
        res.status(400).send("something Went Wrong" + err.message)
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


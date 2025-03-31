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
        

})

connectDB().then(()=>{
    console.log("Connected to database");
    app.listen(2000,()=>{
        console.log(`Server is running on port ${2000}`);
    })
}).catch((err)=>{
    console.log("Error connecting to database",err);
}) ;


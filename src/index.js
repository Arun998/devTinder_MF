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
        res.send("user updated sucessfully")
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


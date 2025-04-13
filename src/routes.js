const express = require('express');

const route = express();

// routes will excute based on the order they are defined
// if we have use / and /home it always check for / first
// so we need to define the routes in order

//play with http methods

// get request
// route.get('/user',(req,res)=>{
//     res.send({
//         name: "John",
//         age: 30,
//         city: "New York"
//     });
// })

// post request
route.post('/user',(req,res)=>{
    res.send("Hello from user post");
})

// put request
route.put('/user',(req,res)=>{
    res.send("Hello from user put");
})

// delete request
route.delete('/user',(req,res)=>{
    res.send("Hello from user delete");
})

// patch request
route.patch('/user',(req,res)=>{
    res.send("Hello from user patch");
})

// play with regex routes
// this will match any route that contains home
route.get(/.*home/,(req,res)=>{
    res.send("Hello from home");
});

// this will match any route that contains home and is followed by a number
route.get(/home[0-9]/,(req,res)=>{
    res.send("Hello from home with number");
});

// play with params
// log the params from the url
route.get('/user/:id',(req,res)=>{
    console.log(req.params);
    res.send(req.params);
});

// log the query params from the url
route.get('/user',(req,res)=>{
    console.log(req.query);
    res.send(req.query);
});

route.get('/example/b', (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
  }, (req, res) => {
    res.send('Hello from B!')
  })

  // verify this page for more routing details https://expressjs.com/en/guide/routing.html

  //user routes examples 
  // get user from particular email id 
//   app.get('/user',async(req,res)=>{

//     try{
//         const userEmail = await User.find({emailId : req.body.emailId})

//         res.send(userEmail)
//     }
//     catch (err){
//         res.status(400).send("something went wrong");
//     }
   
// })

// // get all users documents from User collection 

// app.get('/feed',async(req,res)=>{
//     try{
//         // give empty filter in find to get all the users 
//         const users = await User.find({});
        
//         res.send(users)
//     }
//     catch(err){
//         res.status(400).send("something went wrong")
//     }
// });

// // delete the user based on userId;

// app.delete('/user', async(req,res)=>{
//     try{
//         console.log(req.body.emailId) // user id is the _id in dataBase
//         // delete the user based on Id
//         // const userId = await User.findByIdAndDelete(req.body.userId); 

//         // delete the user based on emailId;
//         const emailId = await User.findOneAndDelete({emailId : req.body.emailId})

//         res.send('user deleted sucesfully')
//     }
//     catch(err){
//         res.status(400).send("something went wrong")
//     }
// });

// // update the user based on userId and emailID;

// app.patch('/user',async(req,res)=>{
//     try{
//         // updating user based on userId;
//         // const userId = await User.findByIdAndUpdate(req.body.userId,req.body)

//         // update user based on emailId
//         const userId = await User.findOneAndUpdate({emailId : req.body.emailId},req.body)
//         if(!userId){
//             throw new Error("invalid")
//         }
//         res.send("user updated sucessfully")
//     }
//     catch(err){
//         res.status(400).send("something went wrong 🤗")
//     }
// })

module.exports = route;

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

module.exports = route;

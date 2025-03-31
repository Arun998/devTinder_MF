const express = require('express');
const routes = require('./routes');

const app = express();

const port = 2000;

app.use('/home',(req,res)=>{
    res.send("Hello from home");
});

// use the routes
app.use('/',routes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
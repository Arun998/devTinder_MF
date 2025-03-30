const express = require('express');

const app = express();

const port = 2000;

app.use('/home',(req,res)=>{
    res.send("Hello from home");
});

app.use('/',(req,res)=>{
    res.send("Hello from dashBoard");
});



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
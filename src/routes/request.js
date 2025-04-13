const express = require("express");
const {userAuth} = require('../middlewares/auth')


const requestRouter = express.Router();

requestRouter.post('/sendConnection',userAuth,async(req,res)=>{
    console.log(req.cookies);
    res.send("connection request sent")
});

module.exports = requestRouter;
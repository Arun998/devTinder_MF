const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth')

// get user profile

profileRouter.get('/profile',userAuth,async(req,res)=>{
    try{
        const profileData = req.user;
        res.send(profileData)
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
   
});

module.exports = profileRouter;
const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const {validateProfileEditData} = require("../utils/validator")

// get user profile

profileRouter.get('/profile/view',userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.json({
            message : "user profile fetched sucessfully",
            user
        });
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
   
});

//edit profile

profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
    try{
        if(!validateProfileEditData(req)){
            throw new Error("invalid edit details")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key]);
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName} profile updated sucessfully`,
            data: loggedInUser
        })
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = profileRouter;
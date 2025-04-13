const jwt = require("jsonwebtoken");
const User = require('../models/user')

const userAuth = async(req,res,next)=>{
    try{
        // take cookie from request
        const {token} = req.cookies;
        if(!token){
            throw new Error("Invalid Token")
        }
        // validate the cookie ;
        const decodeToken =  jwt.verify(token,"arundev")
        const {_id} = decodeToken;
        const profileData = await User.findById(_id);
        if(!profileData){
            throw new Error("Profile data not availabe for this user")
        }
        req.user = profileData;
        next();
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
    // find the user
};

module.exports={
    userAuth
}
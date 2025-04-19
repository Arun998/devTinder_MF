const express = require("express");
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/user');


const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:userId',userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;
        const allowedStatus = ["ignored","intrested"];
        if(!allowedStatus.includes(status)){
            res.status(400).json({message: 'invalid send request:' + status})
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not found!" });
        }
        // check if any request already exists from the fromUserId to the toUserId user or 
        // from the toUserId to the fromUserId user
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });
        if (existingRequest) {
            return res.status(400).json({ message: "Connection request already exists!" });
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        await connectionRequest.save();
        res.send("connection Request sent succesfully")
    }catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
});

module.exports = requestRouter;
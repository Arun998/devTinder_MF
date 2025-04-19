const mongoose = require("mongoose");

const {Schema} = mongoose;

const connectionRequestSchema = new Schema({
    fromUserId: {
        type : Schema.Types.ObjectId,
        required : true
    },
    toUserId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    status :{
        type : String,
        enum :{
            values :["ignored","intrested","accepted","rejected"],
            message : `$VALUE} is incorrect status type.`
        }
    }
},{timestamps : true});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true }); //compund index 

connectionRequestSchema.pre('save', function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("fromUserId and toUserId should be different.")
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequest;

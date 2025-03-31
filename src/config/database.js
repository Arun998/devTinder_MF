const mongoose = require("mongoose");

const connectDB = async ()=>{
     await mongoose.connect("mongodb+srv://Arun:LaSRD1coGrfZIu9S@node.wmqftax.mongodb.net/devTinder")
}

module.exports = connectDB;
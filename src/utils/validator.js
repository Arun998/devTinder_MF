const validator = require('validator');

const validateUserSchema =(req)=>{
    const {firstName,lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("first & last name required")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Enter valid Email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("enter a strong password")
    }
}

module.exports ={
    validateUserSchema
}
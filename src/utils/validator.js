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

const validateProfileEditData = (req)=>{
    const allowedFields = ['firstName','lastName',"age","gender","skills","about", "photoUrl"];
    return Object.keys(req.body).every(field=>allowedFields.includes(field));
}

module.exports ={
    validateUserSchema,
    validateProfileEditData
}
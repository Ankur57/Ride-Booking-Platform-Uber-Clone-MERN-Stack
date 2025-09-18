//code to create a user schema and functions to compare hash password.
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    fullname : {
        firstname :{
            type : String,
            required : true,
            minlength : [3,
                'First name should be of 3 length'
            ]
        },
         lastname :{
            type : String,
            minlength : [3,
                'Last name should be of 3 length'
            ]
        }
    },
        email: {
            type : String,
            required : true,
            unique : true,
            minlength : [5,"Email should be of 5 length"]
        },
        password : {
            type : String,
            required : true,
            select : false
        },

        socketId : {
            type : String,
        }
})
//here we are making functions for future reference
/**
 * 1. What is happening here?
userSchema.method.generateAuthToken = function(){...}
→ You are adding a custom method to the userSchema.
→ Every document (user) created from this schema will now have access to a function called generateAuthToken.
 */
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        _id:this._id },process.env.JWT_SECRET);
    return token;
}//This is a user schema function that runs
//  when a user is created and assigns a token to it.

userSchema.methods.comparePassword = async function (password){
    return await bcrypt. compare(password,this.password)
}
//comparing password

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
//password hashing 

const userModel  = mongoose.model('user',userSchema);

module.exports = userModel;
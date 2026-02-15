const userModel = require('../models/user.model');
const userservice = require('../services/user.service')
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async(req,res,next) =>{
    const errors = validationResult(req);// Checks if there is any error in body(), check(), functions
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    try{
        
        const {fullname,email,password} = req.body;

        const isUserAlready = await userModel.findOne({email});
        
        if(isUserAlready){
            return res.status(400).json({message:"User Already registered"})
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userservice.createUser({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password : hashedPassword
        })
        const token = user.generateAuthToken();
        res.cookie('token',token);
        console.log("User Registered")
       res.status(201).json({ token, user });

    } catch(err) {
        console.log(err);
        res.status(500).json({ message:"server error"});
    }
}

module.exports.loginUser = async(req,res,next)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message : "User not found"});
    }

    const ismatch = await user.comparePassword(password);

    if(!ismatch){
        return res.status(401).json({message : "User not found"})
    }

    const token = user.generateAuthToken();
    
    res.cookie('token',token);
    console.log(user)
    res.status(200).json({ token, user });
}
    
module.exports.getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });

}
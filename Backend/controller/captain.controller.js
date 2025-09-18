const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model')
const captainService = require('../Services/captain.service');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async(req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    try{
        const {fullname,email,password,vehicle} = req.body; 

        const isCaptainAlready = await captainModel.findOne({email});

        if(isCaptainAlready){
            return res.status(400).json({message:"Captian Already exists"});
        }

        const hashedPassword = await captainModel.hashedPassword(password);

        const captain = await captainService.createCaptain({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password  : hashedPassword,
            color : vehicle.color,
            plate : vehicle.plate,
            capacity : vehicle.capacity,
            type : vehicle.type
        })

        const token = captain.generateAuthToken();
        res.cookie('token',token);
        console.log("Captain registered successfully");
        res.status(201).json({token,captain});
    } catch ( err ){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
    
}

module.exports.loginCaptain = async(req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {email,password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(401).json({message: 'User Not found'});
    }

    const ismatch = await captain.comparePassword(password,captain.password);

    if(!ismatch){
        return res.status(400).json({message : "User Not Found"});
    }

    const token  = captain.generateAuthToken();

    res.cookie('token',token);
    res.status(200).json({token,captain});

}

module.exports.getCaptainProfile = async(req,res,next)=>{
    res.status(200).json({captain : req.captain});    
}

module.exports.logoutCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    res.clearCookie('token');

    await blacklistTokenModel.create({token});
    res.status(200).json({message : "Captain logged out successfully "});
}










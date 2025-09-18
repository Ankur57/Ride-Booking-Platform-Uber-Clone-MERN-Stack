const dotenv = require('dotenv')//Environment variable
dotenv.config();
const express = require('express')
const router = express.Router();
const  {body} = require('express-validator')
const userController = require('../controller/user.controller')
const authmiddleware = require('../Middlewares/auth.middleware')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min : 3}).withMessage
    ("First Name should be of minimum 3 length"),
    body('password').isLength({min:6}).withMessage
    ("Password should be of minimum 6 length")
],
    userController.registerUser
    )

router.post('/login',[
    body('email').isEmail().withMessage("Enter valid email"),
    body('password').isLength({min:3}).withMessage("Enter valid password")
],
    userController.loginUser
)

router.get('/profile',authmiddleware.authUser,userController.getUserProfile)

router.get('/logout' , authmiddleware.authUser,userController.logoutUser)

module.exports = router;
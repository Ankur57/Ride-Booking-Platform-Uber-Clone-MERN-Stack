const dotenv = require('dotenv')//Environment variable
dotenv.config();
const express = require('express')
const cors = require('cors')//CORS specify which domains can access your backend.
const app = express();//opened the toolbox
app.use(cors());//Cors is used to accept request
//  from specific domain
const cookieParser = require('cookie-parser');
app.use(cookieParser())
const userroutes = require('./Routes/user.route')//User Route
const captainRoutes = require('./Routes/captain.route')
const mapsRoutes = require('./Routes/maps.routes')
const rideRoutes = require('./Routes/ride.routes')
require('./models/captain.model')
require('./models/ride.model')
require('./models/user.model')


app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    console.log("Server is running");
    res.send("Hello World");
})

app.use('/maps',mapsRoutes)
app.use('/rides',rideRoutes)
app.use('/user',userroutes)
app.use('/captain',captainRoutes)

module.exports = app;
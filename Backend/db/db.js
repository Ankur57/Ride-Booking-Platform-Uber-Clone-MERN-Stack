const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT,{ 
        useUnifiedTopology: true,
        useNewUrlParser : true,
    }).then(() => console.log("Connected to DB"))
    .catch(err => console.log("Could not connect to DB",err));
}

module.exports = connectToDb;
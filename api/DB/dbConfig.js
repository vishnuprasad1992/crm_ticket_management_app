const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDb = async () =>{
    
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useCreateIndex : true,
            useFindAndModify:false,
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
    
        console.log("Mongo Db connected successfully");
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDb;
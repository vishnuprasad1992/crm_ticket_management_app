const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    company: {
        type: String,
        minLength: 5,
    },
    address: {
        type: String,
        minLength: 5,
    },
    password: {
        type: String,
        minLength: 5,
        required: true
    },
    isVerified:{
        type: Boolean,
        required:true,
        default:false
    },
    refreshToken:{
        token :{
            type : String,
            maxLength : 500,
            default:""
        },
        addedAt :{
            type : Date,
            default:Date.now(),
            required : true
        }
    }
},
    { timestamps: true }
);
module.exports = mongoose.model("Users", schema);
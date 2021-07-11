const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true,
        unique:true,
        minLength : 6,
        maxLength :6
    },
    addedAt:{
        type :Date,
        required: true,
        default: Date.now()
    }
},
    { timestamps: true }
);
module.exports = mongoose.model("resetPin", schema);
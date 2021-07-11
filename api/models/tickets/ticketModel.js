const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    subject: {
        type: String,
        minLength: 5,
        required: true,
        default: ""
    },
    status: {
        type: String,
        required: true,
        default: "response pending from operator"
    },
    openedDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    conversation: [
        {
            messageBy: {
                type:String,
                required: true,
                maxLength : 50,
                default:""
            },
            message: {
                type:String,
                required: true,
                maxLength : 300,
                default:""
            },
            date: {
                type: Date,
                default: Date.now(),
                required: true
            },
        }
    ]
},
    { timestamps: true }
);
module.exports = mongoose.model("Tickets", schema);
const mongoose = require("mongoose")

let schema = new mongoose.Schema({
    contactName: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: Number,
        required: true,
        unique: true
    },
    contactAddress: {
        type: String,
        required: true
    }
})

const userDB = mongoose.model('userdb', schema);

module.exports = userDB;
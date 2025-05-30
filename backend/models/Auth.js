const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

const Auth = new mongoose.model("AuthMay", authSchema)

module.exports = Auth;
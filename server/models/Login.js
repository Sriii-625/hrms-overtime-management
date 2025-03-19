const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String,
}, {collection: "login"})

const LoginModel = mongoose.model("Login", LoginSchema)
module.exports = LoginModel

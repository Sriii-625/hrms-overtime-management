const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    firstname: { type: String, required: true },  // Ensure email is always provided
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    role: { type: String, required: true }
}, { collection: "profiles" });

const ProfileModel = mongoose.model("Profile", ProfileSchema);
module.exports = ProfileModel;

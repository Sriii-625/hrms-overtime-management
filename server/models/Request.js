const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    email: { type: String, required: true },  // Ensure email is always provided
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    reason: { type: String, required: true }
}, { collection: "request" });

const RequestModel = mongoose.model("Request", RequestSchema);
module.exports = RequestModel;

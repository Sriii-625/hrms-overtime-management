const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    email: { type: String, required: true },  // Ensure email is always provided
    type: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    reason: { type: String, required: true }
}, { collection: "leave" });

const LeaveModel = mongoose.model("Leave", LeaveSchema);
module.exports = LeaveModel;

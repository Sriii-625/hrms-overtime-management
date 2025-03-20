const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const LoginModel = require("./models/Login");
const RequestModel = require("./models/Request");
const ProfileModel = require("./models/Profile");
const LeaveModel = require("./models/Leave");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/overtime", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await LoginModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No record existing!" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "The Password is Incorrect!" });
    }

    res.json({ message: "Success", role: user.role, email: user.email }); // Send email to store locally

  } catch (err) {
    console.error("Error Logging In Employee:", err);
    res.status(500).json(err);
  }
});

app.post("/overtime-request", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);
    const employee = await RequestModel.create(req.body);
    console.log("Request Saved:", employee);
    res.json(employee);
  } catch (err) {
    console.error("Error Saving Request:", err);
    res.status(500).json(err);
  }
});

app.get("/requests", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    console.error("Missing email in request!");
    return res.status(400).json({ message: "Email is required!" });
  }

  try {
    const requests = await RequestModel.find({ email }); // Fetch only requests for the logged-in user
    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/get-profile", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    console.error("Missing email in request!");
    return res.status(400).json({ message: "Email is required!" });
  }

  try {
    const profile = await ProfileModel.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found!" });
    }

    res.json(profile); // Send the matched profile to the frontend
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/update-profile", async (req, res) => {
  const { _id, firstName, lastName, phone, department, position } = req.body;

  if (!_id) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  try {
    const updatedUser = await ProfileModel.findByIdAndUpdate(
      _id, 
      { firstName, lastName, phone, department, position },
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.put("/change-password", async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword, email } = req.body;
    
    console.log("Received request body:", req.body);

    if (!email) {
      return res.status(400).json({ message: "Email is required!" });
    }

    const user = await LoginModel.findOne({ email });

    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.password !== oldPassword) {
      return res.status(400).json({ message: "Old password is incorrect!" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match!" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/leave-request", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);
    const leave = await LeaveModel.create(req.body);
    console.log("Request Saved:", leave);
    res.json(leave);
  } catch (err) {
    console.error("Error Saving Request:", err);
    res.status(500).json(err);
  }
});

app.get("/leave", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    console.error("Missing email in request!");
    return res.status(400).json({ message: "Email is required!" });
  }

  try {
    const requests = await LeaveModel.find({ email }); // Fetch only requests for the logged-in user
    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});

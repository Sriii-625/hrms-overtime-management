const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const LoginModel = require("./models/Login");
const RequestModel = require("./models/Request");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // specify your frontend's URL
    credentials: true, // allow cookies/credentials
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

// app.get("/requests", async (req, res) => {
//   try {
//     const employees = await RequestModel.find();
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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


// 🔹 CHANGE PASSWORD ENDPOINT
app.post("/change-password", async (req, res) => {
  const { oldPassword, newPassword, confirmPassword, email } = req.body; // Email sent from frontend

  try {
    const user = await LoginModel.findOne({ email });

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

app.listen(3001, () => {
  console.log("Server is running");
});

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const LoginModel = require('./models/Login')

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",  // specify your frontend's URL
    credentials: true  // allow cookies/credentials
}));

mongoose.connect("mongodb://127.0.0.1:27017/overtime", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.log("MongoDB Connection Error:", err));

app.post('/login', (req, res) => {
    const {email, password} = req.body;  // Check what's being sent
    
    LoginModel.findOne({email : email})
      .then(user => {
            if(user) {
                if(user.password === password) {
                  res.json({ message: "Success", role: user.role })
                } else {
                    res.json("The Password is Incorrect!")
                }
            } else {
                res.json("No record existing!")
            }
        })
      .catch(err => {
        console.error("Error Logging In Employee:", err);  // Log any errors
        res.status(500).json(err);
      });
  });

app.listen(3001, () => {
    console.log("Server is running")
})
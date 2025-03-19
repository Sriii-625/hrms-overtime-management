import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
      setError("Please fill in both fields.");
      return;
  }

  try {
      const response = await axios.post("http://localhost:3001/login", { email, password });
      const data = response.data;

      console.log("Login Response:", data); // Debugging

      if (data.message === "Success") {
          alert("Login Successful!");
          localStorage.setItem("email", response.data.email); 

          // Store role in localStorage
          localStorage.setItem("userRole", data.role);

          // Navigate based on role
          if (data.role === "admin") {
              navigate('/admin');
          } else if (data.role === "employee") {
              navigate('/employee');
          } else {
              navigate('/hr');
          }
      } else {
          setError(data.message);
      }
  } catch (err) {
      console.error("Login Error:", err);
      setError("An error occurred. Please try again later.");
  }
};

return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;
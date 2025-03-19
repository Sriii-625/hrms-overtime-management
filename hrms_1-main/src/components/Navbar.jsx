import React from "react";
import "./Navbar.css"; // Import styles
import { useNavigate } from "react-router-dom";

const Navbar = ({ userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="navbar">
      {/* Search bar */}
      <input type="text" placeholder="Search Employee..." className="search-bar" />

      {/* Right side content */}
      <div className="navbar-right">
        <span className="working-time">Working Time: 9:00 AM - 6:00 PM</span>

        {/* Dropdown */}
        <div className="dropdown">
          <button className="dropbtn">{userRole} ▼</button>
          <div className="dropdown-content">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

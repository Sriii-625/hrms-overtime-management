import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ menuItems }) => {
  return (
    <div className="sidebar">
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink 
              to={item.path} 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

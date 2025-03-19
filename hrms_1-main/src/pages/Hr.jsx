import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Hr.css"; 

const hrMenu = [
  { name: "Dashboard", path: "/hr/dashboard" },
  { name: "Manage Employees", path: "/hr/employees" },
  { name: "Overtime Requests", path: "/hr/overtime-requests" },
  { name: "Attendance & Leave Management", path: "/hr/attendence-leave" },
  {name: "Payroll Management",path: "hr/payroll"},
  { name: "Performance Reviews", path: "/hr/performance" },
  { name: "Reports & Analytics", path: "/hr/reports" },
  { name: "Settings", path: "/hr/settings" },
];
const Hr = () => {
  return (
    <div className="hr-container">
      <Navbar userRole="HR" />
      <div className="hr-content">
        <Sidebar menuItems={hrMenu}/>
        <div className="hr-main">
          {/* <h1>HR Dashboard</h1>
          <p>Manage employee data and requests.</p> */}
        </div>
      </div>
    </div>
  );
};

export default Hr;

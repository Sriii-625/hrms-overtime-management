import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Employee.css";
import OvertimeRequests from "./Employee/OvertimeRequests/OvertimeRequests";
import Payroll from "./Employee/Payroll/Payroll";
import AttendanceLeaves from "./Employee/AttendanceLeaves/AttendanceLeaves";
import Performance from "./Employee/Performance/Performance";
import Policies from "./Employee/Policies/Policies";
import Settings from "./Employee/Settings/Settings";

const employeeMenu = [
  { name: "Overtime Requests", path: "/employee/overtime-requests" },
  { name: "Payroll", path: "/employee/payroll" },
  { name: "Attendance & Leaves", path: "/employee/attendance-leaves" },
  { name: "Performance", path: "/employee/performance" },
  { name: "Policies", path: "/employee/policies" },
  { name: "Settings", path: "/employee/settings" }
];

const Employee = () => {
  return (
    <div className="employee-container">
      <Navbar userRole="Employee" />
      <div className="employee-content">
        <Sidebar menuItems={employeeMenu} />
        <div className="employee-main">
          <Routes>
            {/* Default Route to Overtime Requests */}
            <Route path="/" element={<Navigate to="/employee/overtime-requests" />} />
            <Route path="/overtime-requests" element={<OvertimeRequests />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/attendance-leaves" element={<AttendanceLeaves />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Employee;

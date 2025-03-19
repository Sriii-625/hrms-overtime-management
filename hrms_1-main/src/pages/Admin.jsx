import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Admin.css";
import AdminDashboard from "./Admin/AdminDashboard";
import ManageEmployees from "./Admin/ManageEmployees";
import ManageHR from "./Admin/ManageHr";
import Reports from "./Admin/Reports";
import OvertimePolices from "./Admin/OvertimePolices";
import OvertimeRequests from "./Admin/OvertimeRequests";
import Settings from "./Admin/Settings";

const adminMenu = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Manage Employees", path: "/admin/employees" },
  { name: "Manage HR", path: "/admin/hr" },
  { name: "Overtime Requests", path: "/admin/overtime-requests" },
  { name: "Reports & Analytics", path: "/admin/reports" },
  { name: "Overtime Policies", path: "/admin/overtime-policies" },
  { name: "Settings", path: "/admin/settings" },
];

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar userRole="Admin" />
      <div className="admin-content">
        <Sidebar menuItems={adminMenu} />
        <div className="admin-main">
          <Routes>
            {/* Default Route to Dashboard */}
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/employees" element={<ManageEmployees />} />
            <Route path="/hr" element={<ManageHR/>} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/overtime-policies" element={<OvertimePolices />} />
            <Route path="/overtime-requests" element={<OvertimeRequests />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;

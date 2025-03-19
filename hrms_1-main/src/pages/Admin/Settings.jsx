import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  // Example settings data
  const [settings, setSettings] = useState({
    companyName: "Your Company",
    workingHours: "9:00 AM - 6:00 PM",
    adminEmail: "admin@company.com",
    notifications: true,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = () => {
    setSettings({ ...settings, notifications: !settings.notifications });
  };

  // Save settings (this could be replaced with an API call to save changes)
  const handleSaveSettings = () => {
    alert("Settings have been saved!");
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      {/* Settings Form */}
      <div className="settings-form">
        <div className="settings-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={settings.companyName}
            onChange={handleInputChange}
          />
        </div>

        <div className="settings-group">
          <label>Working Hours</label>
          <input
            type="text"
            name="workingHours"
            value={settings.workingHours}
            onChange={handleInputChange}
          />
        </div>

        <div className="settings-group">
          <label>Admin Email</label>
          <input
            type="email"
            name="adminEmail"
            value={settings.adminEmail}
            onChange={handleInputChange}
          />
        </div>

        <div className="settings-group">
          <label>Enable Notifications</label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={handleCheckboxChange}
          />
        </div>

        <button className="save-btn" onClick={handleSaveSettings}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;

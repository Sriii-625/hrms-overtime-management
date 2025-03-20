import React, { useState, useEffect  } from "react";
import axios from 'axios';
import "./Settings.css";

const Settings = () => {
  const [profileData, setProfileData] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      console.error("No email found in localStorage! Cannot fetch profile.");
      return;
    }

    axios
      .get(`http://localhost:3001/get-profile?email=${email}`)
      .then(response => {
        console.log("Fetched Profile Data:", response.data);
        setProfileData(response.data);
      })
      .catch(err => console.error("Error Fetching Profile Data:", err));
  }, [email]);

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    overtimeUpdates: true,
    leaveUpdates: true,
    performanceReviews: true,
    payrollAlerts: true
  });

  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put("http://localhost:3001/update-profile", profileData);
      alert(res.data.message); // Show success message
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };
  
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const handlePasswordChange = async (e) => {
    e.preventDefault(); // Prevent page reload
  
    const email = localStorage.getItem("email");
  
    if (!email) {
      console.error("User not logged in");
      return;
    }
  
    try {
      const response = await axios.put("http://localhost:3001/change-password", {
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
        confirmPassword: password.confirmPassword,
        email,
      });
  
      console.log("Success:", response.data.message);
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    }
  };  
  
  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <div className="settings-content">
        <div className="settings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Settings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        <div className="settings-panel">
          {activeTab === 'profile' && (
            <div className="profile-settings">
              <h2>Profile Settings</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Department</label>
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      value={profileData.position}
                      onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                      disabled
                    />
                  </div>
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notification-settings">
              <h2>Notification Preferences</h2>
              <div className="notification-options">
                <div className="notification-option">
                  <div>
                    <h3>Email Notifications</h3>
                    <p>Receive general notifications via email</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.emailNotifications}
                      onChange={() => handleNotificationUpdate('emailNotifications')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-option">
                  <div>
                    <h3>Overtime Updates</h3>
                    <p>Get notified about overtime request status</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.overtimeUpdates}
                      onChange={() => handleNotificationUpdate('overtimeUpdates')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-option">
                  <div>
                    <h3>Leave Updates</h3>
                    <p>Get notified about leave request status</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.leaveUpdates}
                      onChange={() => handleNotificationUpdate('leaveUpdates')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-option">
                  <div>
                    <h3>Performance Reviews</h3>
                    <p>Get notified about new performance reviews</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.performanceReviews}
                      onChange={() => handleNotificationUpdate('performanceReviews')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-option">
                  <div>
                    <h3>Payroll Alerts</h3>
                    <p>Get notified about salary and payroll updates</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.payrollAlerts}
                      onChange={() => handleNotificationUpdate('payrollAlerts')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="security-settings">
              <h2>Security Settings</h2>
              <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={password.current}
                    onChange={(e) => setPassword({...password, oldPassword: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={password.new}
                    onChange={(e) => setPassword({...password, newPassword: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={password.confirm}
                    onChange={(e) => setPassword({...password, confirmPassword: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="save-btn">Update Password</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

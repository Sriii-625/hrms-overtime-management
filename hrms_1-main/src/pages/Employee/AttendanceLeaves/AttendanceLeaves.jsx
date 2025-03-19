import React, { useState } from "react";
import "./AttendanceLeaves.css";

const AttendanceLeaves = () => {
  // Sample attendance data
  const [attendanceRecords] = useState([
    { 
      date: "2024-03-20", 
      checkIn: "09:00", 
      checkOut: "18:00",
      status: "Present"
    },
    { 
      date: "2024-03-19", 
      checkIn: "09:15", 
      checkOut: "18:30",
      status: "Present"
    },
    { 
      date: "2024-03-18", 
      checkIn: "-", 
      checkOut: "-",
      status: "Leave"
    }
  ]);

  // Sample leave data
  const [leaveBalance] = useState({
    annual: 15,
    sick: 7,
    casual: 5
  });

  const [leaveHistory] = useState([
    {
      id: 1,
      type: "Annual",
      startDate: "2024-03-18",
      endDate: "2024-03-18",
      days: 1,
      reason: "Personal work",
      status: "Approved"
    },
    {
      id: 2,
      type: "Sick",
      startDate: "2024-02-15",
      endDate: "2024-02-16",
      days: 2,
      reason: "Fever",
      status: "Approved"
    }
  ]);

  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [newLeave, setNewLeave] = useState({
    type: "Annual",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    // Add leave request logic here
    setShowLeaveForm(false);
  };

  return (
    <div className="attendance-leaves-container">
      <h1>Attendance & Leaves</h1>

      {/* Leave Balance Cards */}
      <div className="leave-balance-cards">
        <div className="balance-card">
          <h3>Annual Leave</h3>
          <p>{leaveBalance.annual} days</p>
          <span>Remaining</span>
        </div>
        <div className="balance-card">
          <h3>Sick Leave</h3>
          <p>{leaveBalance.sick} days</p>
          <span>Remaining</span>
        </div>
        <div className="balance-card">
          <h3>Casual Leave</h3>
          <p>{leaveBalance.casual} days</p>
          <span>Remaining</span>
        </div>
      </div>

      {/* Recent Attendance Section */}
      <div className="section">
        <div className="section-header">
          <h2>Recent Attendance</h2>
        </div>
        <div className="attendance-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.checkIn}</td>
                  <td>{record.checkOut}</td>
                  <td>
                    <span className={`status ${record.status.toLowerCase()}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Management Section */}
      <div className="section">
        <div className="section-header">
          <h2>Leave Management</h2>
          <button 
            className="new-leave-btn"
            onClick={() => setShowLeaveForm(!showLeaveForm)}
          >
            Request Leave
          </button>
        </div>

        {/* Leave Request Form */}
        {showLeaveForm && (
          <div className="leave-form">
            <h3>New Leave Request</h3>
            <form onSubmit={handleLeaveSubmit}>
              <div className="form-group">
                <label>Leave Type</label>
                <select 
                  value={newLeave.type}
                  onChange={(e) => setNewLeave({...newLeave, type: e.target.value})}
                >
                  <option value="Annual">Annual Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Casual">Casual Leave</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input 
                    type="date"
                    value={newLeave.startDate}
                    onChange={(e) => setNewLeave({...newLeave, startDate: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input 
                    type="date"
                    value={newLeave.endDate}
                    onChange={(e) => setNewLeave({...newLeave, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Reason</label>
                <textarea
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({...newLeave, reason: e.target.value})}
                  placeholder="Enter reason for leave"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Submit Request</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowLeaveForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Leave History Table */}
        <div className="leave-history">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.type}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.days}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <span className={`status ${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceLeaves;

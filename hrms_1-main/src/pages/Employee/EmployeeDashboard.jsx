import React from "react";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  // Sample data for overtime requests
  const recentRequests = [
    { id: 1, date: "2024-03-20", hours: 3, status: "Pending" },
    { id: 2, date: "2024-03-18", hours: 2, status: "Approved" },
    { id: 3, date: "2024-03-15", hours: 4, status: "Rejected" },
  ];

  // Sample data for upcoming overtimes
  const upcomingOvertimes = [
    { id: 1, date: "2024-03-25", hours: 2, project: "Project A" },
    { id: 2, date: "2024-03-28", hours: 3, project: "Project B" },
  ];

  return (
    <div className="dashboard-container">
      <h1>My Dashboard</h1>
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Overtime Hours</h3>
          <p>65 hours</p>
        </div>
        <div className="stat-card">
          <h3>Pending Requests</h3>
          <p>2</p>
        </div>
        <div className="stat-card">
          <h3>Available Leave Days</h3>
          <p>15 days</p>
        </div>
        <div className="stat-card">
          <h3>This Month's Overtime</h3>
          <p>12 hours</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h2>Recent Overtime Requests</h2>
          <div className="request-list">
            {recentRequests.map(request => (
              <div key={request.id} className="request-item">
                <div className="request-info">
                  <span className="date">{request.date}</span>
                  <span className="hours">{request.hours} hours</span>
                </div>
                <span className={`status ${request.status.toLowerCase()}`}>
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Upcoming Overtimes</h2>
          <div className="upcoming-list">
            {upcomingOvertimes.map(overtime => (
              <div key={overtime.id} className="upcoming-item">
                <div className="overtime-info">
                  <span className="date">{overtime.date}</span>
                  <span className="project">{overtime.project}</span>
                </div>
                <span className="hours">{overtime.hours} hours</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

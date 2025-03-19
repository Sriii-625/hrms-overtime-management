import React, { useState } from "react";
import "./OvertimeRequests.css";

const OvertimeRequests = () => {
  // Sample overtime requests data (Replace with actual data fetching logic)
  const [requests, setRequests] = useState([
    { id: 1, employee: "Employee1", department: "IT", hours: 4, status: "Pending" },
    { id: 2, employee: "Employee2", department: "Sales", hours: 6, status: "Pending" },
    { id: 3, employee: "Employee3", department: "HR", hours: 3, status: "Approved" },
  ]);

  // Handle Approve Request
  const handleApprove = (id) => {
    setRequests(requests.map((request) =>
      request.id === id ? { ...request, status: "Approved" } : request
    ));
  };

  // Handle Reject Request
  const handleReject = (id) => {
    setRequests(requests.map((request) =>
      request.id === id ? { ...request, status: "Rejected" } : request
    ));
  };

  return (
    <div className="overtime-requests-container">
      <h1 className="overtime-requests-title">Overtime Requests</h1>

      {/* Overtime Requests List Table */}
      <section className="requests-list">
        <h2>Employee Overtime Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Overtime Hours</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.employee}</td>
                <td>{request.department}</td>
                <td>{request.hours}</td>
                <td>
                  <span className={`status ${request.status.toLowerCase()}`}>{request.status}</span>
                </td>
                <td>
                  {request.status === "Pending" && (
                    <div>
                      <button className="approve-btn" onClick={() => handleApprove(request.id)}>
                        Approve
                      </button>
                      <button className="reject-btn" onClick={() => handleReject(request.id)}>
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OvertimeRequests;

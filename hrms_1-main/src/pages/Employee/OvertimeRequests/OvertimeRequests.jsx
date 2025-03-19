import React, { useState } from "react";
import "./OvertimeRequests.css";
import RequestForm from './RequestForm';
import RequestList from './RequestList';

const OvertimeRequests = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([
    {
      id: 1,
      date: "2024-03-20",
      startTime: "18:00",
      endTime: "21:00",
      hours: 3,
      reason: "Project deadline",
      status: "Pending"
    },
    {
      id: 2,
      date: "2024-03-18",
      startTime: "17:00",
      endTime: "20:00",
      hours: 3,
      reason: "System maintenance",
      status: "Approved"
    },
    {
      id: 3,
      date: "2024-03-15",
      startTime: "18:00",
      endTime: "22:00",
      hours: 4,
      reason: "Client meeting",
      status: "Rejected"
    }
  ]);

  const [newRequest, setNewRequest] = useState({
    date: "",
    startTime: "",
    endTime: "",
    reason: ""
  });

  const handleFormSubmit = (formData) => {
    const hours = calculateHours(formData.startTime, formData.endTime);
    
    const request = {
      id: requests.length + 1,
      ...formData,
      hours,
      status: "Pending"
    };

    setRequests([request, ...requests]);
    setShowForm(false);
  };

  const calculateHours = (start, end) => {
    const startTime = new Date(`2024-01-01 ${start}`);
    const endTime = new Date(`2024-01-01 ${end}`);
    const diff = endTime - startTime;
    return Math.round(diff / (1000 * 60 * 60));
  };

  return (
    <div className="overtime-requests-container">
      <div className="requests-header">
        <h1>My Overtime Requests</h1>
        <button 
          className="new-request-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "New Request"}
        </button>
      </div>

      {showForm && (
        <RequestForm 
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <RequestList requests={requests} />
    </div>
  );
};

export default OvertimeRequests;

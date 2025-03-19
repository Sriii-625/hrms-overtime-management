import React from "react";
import "./RequestList.css";

const RequestList = ({ requests }) => {
  // Helper function to format time
  const formatTime = (time) => {
    if (!time) return "Invalid Time"; // Handle missing values

    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for AM
    const formattedMinute = minute.toString().padStart(2, "0");

    return `${formattedHour}:${formattedMinute} ${ampm}`;
  };

  // Function to calculate the duration between start and end times (handles overnight shifts)
  const calculateHours = (start, end) => {
    if (!start || !end) return 0;

    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    let startTime = startHour * 60 + startMinute; // Convert to minutes
    let endTime = endHour * 60 + endMinute; // Convert to minutes

    let diff = (endTime - startTime + 1440) % 1440; // Modulo 1440 to avoid negative values
    return (diff / 60).toFixed(1); // Convert back to hours with one decimal place
  };

  return (
    <div className="requests-list">
      <h2>Request History</h2>
      <div className="requests-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Hours</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.id || index}>
                <td>{request.date}</td>
                <td>{`${formatTime(request.startTime)} - ${formatTime(request.endTime)}`}</td>
                <td>{calculateHours(request.startTime, request.endTime)} hours</td>
                <td>{request.reason}</td>
                <td>
                  <span className={`status ${request.status}`}>
                    {request.status || "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestList;

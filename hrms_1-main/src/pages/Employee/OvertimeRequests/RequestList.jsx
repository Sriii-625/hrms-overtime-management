import React from "react";
import "./RequestList.css";

const RequestList = ({ requests }) => {
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
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.date}</td>
                <td>{`${request.startTime} - ${request.endTime}`}</td>
                <td>{request.hours} hours</td>
                <td>{request.reason}</td>
                <td>
                  <span className={`status ${request.status.toLowerCase()}`}>
                    {request.status}
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

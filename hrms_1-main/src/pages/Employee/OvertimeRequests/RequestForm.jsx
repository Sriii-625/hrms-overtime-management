import React, { useState } from "react";
import "./RequestForm.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RequestForm = ({ onSubmit, onCancel, initialValues = {} }) => {
  const [formData, setFormData] = React.useState({
    date: initialValues.date || "",
    startTime: initialValues.startTime || "",
    endTime: initialValues.endTime || "",
    reason: initialValues.reason || ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    const { date, startTime, endTime, reason } = formData;

    if (!date || !startTime || !endTime || !reason) {
      setError("Please fill in ALL fields.");
      return;
    }

    axios.post('http://localhost:3001/overtime-request', { date, startTime, endTime, reason }, { withCredentials: true })
        .then(result => {
            console.log("Overtime Request Form Response:", result.data);
            if (result.data) {
                navigate('/employee/overtime-requests');
            } else {
                setError(result.data);  // Display error messages from the server
            }
        })
        .catch(err => {
            console.error("Form Submission Error:", err);
            setError("An error occurred. Please try again later.");
        });

        console.log("RequestForm Component Rendered!");

  };

  return (
    <div className="request-form-container">
      <h2>New Overtime Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              required
              value={formData.startTime}
              onChange={(e) => setFormData({...formData, startTime: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              required
              value={formData.endTime}
              onChange={(e) => setFormData({...formData, endTime: e.target.value})}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Reason</label>
          <textarea
            required
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            placeholder="Enter reason for overtime request"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit Request</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;

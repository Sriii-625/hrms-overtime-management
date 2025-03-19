import React from "react";
import "./RequestForm.css";

const RequestForm = ({ onSubmit, onCancel, initialValues = {} }) => {
  const [formData, setFormData] = React.useState({
    date: initialValues.date || "",
    startTime: initialValues.startTime || "",
    endTime: initialValues.endTime || "",
    reason: initialValues.reason || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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

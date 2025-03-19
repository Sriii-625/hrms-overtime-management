import React, { useState } from "react";
import "./OvertimePolices.css";

const OvertimePolices = () => {
  // Sample overtime policies data (Replace with actual data fetching logic)
  const [policies, setPolicies] = useState([
    { id: 1, title: "Standard Overtime", description: "Employees will be compensated at 1.5x the regular rate after 40 hours a week." },
    { id: 2, title: "Holiday Overtime", description: "Employees will receive double pay for overtime worked on holidays." },
  ]);

  // State for new policy form
  const [newPolicy, setNewPolicy] = useState({ title: "", description: "" });

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewPolicy({ ...newPolicy, [e.target.name]: e.target.value });
  };

  // Add new overtime policy
  const handleAddPolicy = () => {
    if (newPolicy.title && newPolicy.description) {
      setPolicies([...policies, { ...newPolicy, id: policies.length + 1 }]);
      setNewPolicy({ title: "", description: "" }); // Reset form
    }
  };

  // Remove overtime policy
  const handleRemovePolicy = (id) => {
    setPolicies(policies.filter((policy) => policy.id !== id));
  };

  return (
    <div className="overtime-policies-container">
      <h1 className="overtime-policies-title">Overtime Policies</h1>

      {/* Policies List Table */}
      <section className="policies-list">
        <h2>Existing Overtime Policies</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td>{policy.title}</td>
                <td>{policy.description}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleRemovePolicy(policy.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add New Policy Form */}
      <section className="add-policy">
        <h2>Add New Overtime Policy</h2>
        <div className="add-policy-form">
          <input
            type="text"
            name="title"
            placeholder="Policy Title"
            value={newPolicy.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Policy Description"
            value={newPolicy.description}
            onChange={handleInputChange}
          ></textarea>
          <button className="add-btn" onClick={handleAddPolicy}>
            Add Policy
          </button>
        </div>
      </section>
    </div>
  );
};

export default OvertimePolices;

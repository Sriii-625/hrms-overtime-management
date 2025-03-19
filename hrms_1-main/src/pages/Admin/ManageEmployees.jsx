import React, { useState } from "react";
import "./ManageEmployees.css";

const ManageEmployees = () => {
  // Sample HR data (Replace with API integration)
  const [hrList, setHrList] = useState([
    { id: 1, name: "example1", email: "example1@company.com", department: "Employee" },
    { id: 2, name: "example2", email: "example2@company.com", department: "Employee" },
  ]);

  // State for form inputs
  const [newHR, setNewHR] = useState({ name: "", email: "", department: "Employee" });

  // Handle form input change
  const handleChange = (e) => {
    setNewHR({ ...newHR, [e.target.name]: e.target.value });
  };

  // Add new HR
  const handleAddHR = () => {
    if (newHR.name && newHR.email) {
      setHrList([...hrList, { ...newHR, id: hrList.length + 1 }]);
      setNewHR({ name: "", email: "", department: "HR" }); // Reset form
    }
  };

  // Remove HR
  const handleRemoveHR = (id) => {
    setHrList(hrList.filter((hr) => hr.id !== id));
  };

  return (
    <div className="manage-hr-container">
      <h1 className="manage-hr-title">Manage Employee</h1>

      {/* HR List Table */}
      <section className="hr-list">
        <h2>Employee Personnel</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hrList.map((hr) => (
              <tr key={hr.id}>
                <td>{hr.id}</td>
                <td>{hr.name}</td>
                <td>{hr.email}</td>
                <td>{hr.department}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleRemoveHR(hr.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add HR Form */}
      <section className="add-hr">
        <h2>Add Employee</h2>
        <div className="add-hr-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={newHR.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newHR.email}
            onChange={handleChange}
          />
          <button className="add-btn" onClick={handleAddHR}>
            Add Employee
          </button>
        </div>
      </section>
    </div>
  );
};

export default ManageEmployees;

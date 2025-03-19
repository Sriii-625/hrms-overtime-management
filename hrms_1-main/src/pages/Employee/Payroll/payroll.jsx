import React, { useState } from "react";
import "./Payroll.css";

const Payroll = () => {
  // Sample payroll data
  const [payslips] = useState([
    {
      id: 1,
      month: "March 2024",
      basicSalary: 5000,
      overtimeHours: 12,
      overtimeAmount: 450,
      deductions: 200,
      netSalary: 5250,
      status: "Paid",
      date: "2024-03-25"
    },
    {
      id: 2,
      month: "February 2024",
      basicSalary: 5000,
      overtimeHours: 15,
      overtimeAmount: 560,
      deductions: 200,
      netSalary: 5360,
      status: "Paid",
      date: "2024-02-25"
    },
    {
      id: 3,
      month: "January 2024",
      basicSalary: 5000,
      overtimeHours: 8,
      overtimeAmount: 300,
      deductions: 200,
      netSalary: 5100,
      status: "Paid",
      date: "2024-01-25"
    }
  ]);

  const [selectedPayslip, setSelectedPayslip] = useState(null);

  return (
    <div className="payroll-container">
      <h1>Payroll Information</h1>

      <div className="payroll-summary">
        <div className="summary-card">
          <h3>Current Month Overtime</h3>
          <p>12 hours</p>
          <span>Estimated Amount: $450</span>
        </div>
        <div className="summary-card">
          <h3>YTD Overtime Earnings</h3>
          <p>$1,310</p>
          <span>Total Hours: 35</span>
        </div>
        <div className="summary-card">
          <h3>Next Payment Date</h3>
          <p>25 April 2024</p>
          <span>Monthly Salary</span>
        </div>
      </div>

      <div className="payslips-section">
        <h2>Recent Payslips</h2>
        <div className="payslips-table">
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Basic Salary</th>
                <th>Overtime Hours</th>
                <th>Overtime Amount</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payslips.map((payslip) => (
                <tr key={payslip.id}>
                  <td>{payslip.month}</td>
                  <td>${payslip.basicSalary}</td>
                  <td>{payslip.overtimeHours} hours</td>
                  <td>${payslip.overtimeAmount}</td>
                  <td>${payslip.netSalary}</td>
                  <td>
                    <span className={`status ${payslip.status.toLowerCase()}`}>
                      {payslip.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="view-btn"
                      onClick={() => setSelectedPayslip(payslip)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPayslip && (
        <div className="payslip-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Payslip Details - {selectedPayslip.month}</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedPayslip(null)}
              >
                ×
              </button>
            </div>
            <div className="payslip-details">
              <div className="detail-row">
                <span>Basic Salary:</span>
                <span>${selectedPayslip.basicSalary}</span>
              </div>
              <div className="detail-row">
                <span>Overtime Hours:</span>
                <span>{selectedPayslip.overtimeHours} hours</span>
              </div>
              <div className="detail-row">
                <span>Overtime Amount:</span>
                <span>${selectedPayslip.overtimeAmount}</span>
              </div>
              <div className="detail-row">
                <span>Deductions:</span>
                <span>${selectedPayslip.deductions}</span>
              </div>
              <div className="detail-row total">
                <span>Net Salary:</span>
                <span>${selectedPayslip.netSalary}</span>
              </div>
              <div className="detail-row">
                <span>Payment Date:</span>
                <span>{selectedPayslip.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;

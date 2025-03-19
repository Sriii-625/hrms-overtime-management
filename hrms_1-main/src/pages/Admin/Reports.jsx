import React, { useState } from "react";
import "./Reports.css";
// import PerformanceChart from "./PerformanceCharts";

const Reports = () => {
  // Sample data for reports (Replace with actual data fetching logic)
  const [reports, setReports] = useState([
    { id: 1, employee: "Employee1", overtime: 12, department: "IT" },
    { id: 2, employee: "Employee2", overtime: 8, department: "Sales" },
    { id: 3, employee: "Employee3", overtime: 15, department: "HR" },
  ]);

  return (
    <div className="reports-container">
      <h1 className="reports-title">Reports & Analytics</h1>

      {/* Overtime Reports Table */}
      <section className="reports-list">
        <h2>Employee Overtime Reports</h2>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Overtime Hours</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.employee}</td>
                <td>{report.department}</td>
                <td>{report.overtime} hours</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add more analytics here like performance or productivity data */}
      {/* <section className="additional-analytics"> */}
        {/* <PerformanceChart/> */}
        {/* <h2>Additional Analytics</h2>
        <p>Here you can include performance or productivity charts/graphs if required.</p> */}
        {/* You can add charts, graphs, etc. using chart libraries like Chart.js or Recharts */}
      {/* </section> */}
    </div>
  );
};

export default Reports;

import React from "react";
import "./AdminDashboard.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  // Overtime statistics (dummy data, replace with API data if needed)
  const data = {
    labels: ["HR", "IT", "Finance", "Sales", "Operations"],
    datasets: [
      {
        label: "Overtime Hours (This Month)",
        data: [30, 50, 20, 60, 40],
        backgroundColor: "var(--accent-lavender)",
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Overview Cards */}
      <section className="cards">
        <div className="card">
          <h3>Total Employees</h3>
          <p>120</p>
        </div>
        <div className="card">
          <h3>Pending Overtime Requests</h3>
          <p>8</p>
        </div>
        <div className="card">
          <h3>Approved Overtime</h3>
          <p>65</p>
        </div>
        <div className="card">
          <h3>Monthly Overtime Payout</h3>
          <p>$12,000</p>
        </div>
      </section>

      {/* Overtime Trend Chart */}
      <section className="charts">
        <h2>Overtime Trend (This Month)</h2>
        <Bar data={data} />
      </section>
    </div>
  );
};

export default AdminDashboard;

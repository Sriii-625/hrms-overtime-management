import React, { useState } from "react";
import "./Performance.css";

const Performance = () => {
  // Sample performance data
  const [performanceMetrics] = useState({
    overallRating: 4.2,
    attendance: 95,
    taskCompletion: 88,
    overtimeEfficiency: 92
  });

  const [reviews] = useState([
    {
      id: 1,
      period: "Q1 2024",
      rating: 4.5,
      reviewer: "John Manager",
      date: "2024-03-15",
      status: "Completed",
      strengths: ["Project management", "Team collaboration", "Technical skills"],
      improvements: ["Documentation", "Time management"],
      comments: "Excellent performance in project deliveries. Need to focus on documentation."
    },
    {
      id: 2,
      period: "Q4 2023",
      rating: 4.0,
      reviewer: "Jane Supervisor",
      date: "2023-12-20",
      status: "Completed",
      strengths: ["Problem solving", "Client communication"],
      improvements: ["Meeting deadlines"],
      comments: "Good overall performance. Continue improving time management skills."
    }
  ]);

  const [goals] = useState([
    {
      id: 1,
      title: "Complete Advanced React Certification",
      deadline: "2024-06-30",
      progress: 65,
      status: "In Progress"
    },
    {
      id: 2,
      title: "Improve Code Review Process",
      deadline: "2024-05-15",
      progress: 40,
      status: "In Progress"
    },
    {
      id: 3,
      title: "Mentor Junior Developers",
      deadline: "2024-12-31",
      progress: 25,
      status: "In Progress"
    }
  ]);

  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <div className="performance-container">
      <h1>Performance Overview</h1>

      {/* Performance Metrics */}
      <div className="metrics-cards">
        <div className="metric-card">
          <h3>Overall Rating</h3>
          <div className="rating">
            <span className="rating-number">{performanceMetrics.overallRating}</span>
            <span className="rating-max">/5</span>
          </div>
          <div className="rating-stars">
            {'★'.repeat(Math.floor(performanceMetrics.overallRating))}
            {'☆'.repeat(5 - Math.floor(performanceMetrics.overallRating))}
          </div>
        </div>
        <div className="metric-card">
          <h3>Attendance Rate</h3>
          <div className="progress-circle">
            <span className="percentage">{performanceMetrics.attendance}%</span>
          </div>
        </div>
        <div className="metric-card">
          <h3>Task Completion</h3>
          <div className="progress-circle">
            <span className="percentage">{performanceMetrics.taskCompletion}%</span>
          </div>
        </div>
        <div className="metric-card">
          <h3>Overtime Efficiency</h3>
          <div className="progress-circle">
            <span className="percentage">{performanceMetrics.overtimeEfficiency}%</span>
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="section">
        <h2>Performance Goals</h2>
        <div className="goals-grid">
          {goals.map((goal) => (
            <div key={goal.id} className="goal-card">
              <h3>{goal.title}</h3>
              <div className="goal-deadline">
                <span>Deadline: {goal.deadline}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="goal-footer">
                <span className="progress-text">{goal.progress}% Complete</span>
                <span className={`status ${goal.status.toLowerCase().replace(' ', '-')}`}>
                  {goal.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="section">
        <h2>Performance Reviews</h2>
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div>
                  <h3>{review.period}</h3>
                  <span className="reviewer">By {review.reviewer}</span>
                </div>
                <div className="review-rating">
                  {review.rating}/5
                </div>
              </div>
              <div className="review-preview">
                <p>{review.comments.substring(0, 100)}...</p>
              </div>
              <div className="review-footer">
                <span className="review-date">{review.date}</span>
                <button 
                  className="view-details-btn"
                  onClick={() => setSelectedReview(review)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Details Modal */}
      {selectedReview && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Performance Review - {selectedReview.period}</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedReview(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="review-detail">
                <strong>Reviewer:</strong> {selectedReview.reviewer}
              </div>
              <div className="review-detail">
                <strong>Rating:</strong> {selectedReview.rating}/5
              </div>
              <div className="review-detail">
                <strong>Date:</strong> {selectedReview.date}
              </div>
              <div className="review-section">
                <h3>Strengths</h3>
                <ul>
                  {selectedReview.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div className="review-section">
                <h3>Areas for Improvement</h3>
                <ul>
                  {selectedReview.improvements.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </div>
              <div className="review-section">
                <h3>Comments</h3>
                <p>{selectedReview.comments}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Performance;

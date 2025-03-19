import React, { useState } from "react";
import "./Policies.css";

const Policies = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  
  const policies = [
    {
      id: 1,
      category: "Overtime",
      title: "Overtime Policy",
      lastUpdated: "2024-01-15",
      content: `
        1. Regular Overtime Rules
        • Overtime work must be pre-approved by immediate supervisor
        • Standard overtime rate is 1.5x regular hourly rate
        • Minimum overtime duration is 1 hour
        
        2. Weekend/Holiday Overtime
        • Weekend overtime rate is 2x regular hourly rate
        • Holiday overtime requires special approval
        
        3. Overtime Limits
        • Maximum 4 hours overtime per day
        • Maximum 20 hours overtime per week
        • Minimum 8 hours rest between shifts
        
        4. Compensation Process
        • Overtime payment processed with monthly salary
        • Detailed breakdown provided in payslip
        • Time tracking must be accurately maintained
      `
    },
    {
      id: 2,
      category: "Leave",
      title: "Leave Policy",
      lastUpdated: "2024-02-01",
      content: `
        1. Annual Leave
        • 20 days per year for full-time employees
        • Pro-rated for new joiners
        • Maximum 5 days carry forward
        
        2. Sick Leave
        • 14 days paid sick leave per year
        • Medical certificate required for 2+ consecutive days
        
        3. Other Leave Types
        • Maternity Leave: 16 weeks
        • Paternity Leave: 2 weeks
        • Bereavement Leave: 3 days
      `
    },
    {
      id: 3,
      category: "General",
      title: "Work From Home Guidelines",
      lastUpdated: "2024-03-01",
      content: `
        1. Eligibility
        • Available to all full-time employees
        • Subject to manager approval
        • Based on job role and performance
        
        2. Equipment & Setup
        • Company laptop provided
        • Internet connectivity required
        • Secure workspace recommended
        
        3. Working Hours
        • Standard office hours apply
        • Regular attendance in team meetings
        • Maintain communication availability
      `
    },
    {
      id: 4,
      category: "General",
      title: "Code of Conduct",
      lastUpdated: "2024-01-30",
      content: `
        1. Professional Behavior
        • Respect for all colleagues
        • No discrimination or harassment
        • Maintain confidentiality
        
        2. Communication
        • Professional communication
        • Timely response to emails
        • Appropriate use of company channels
        
        3. Conflict Resolution
        • Follow reporting hierarchy
        • Use appropriate channels
        • Maintain documentation
      `
    }
  ];

  const categories = [...new Set(policies.map(policy => policy.category))];

  return (
    <div className="policies-container">
      <h1>HR Policies & Guidelines</h1>
      
      <div className="policies-content">
        <div className="policies-list">
          {categories.map(category => (
            <div key={category} className="policy-category">
              <h2>{category}</h2>
              {policies
                .filter(policy => policy.category === category)
                .map(policy => (
                  <div 
                    key={policy.id} 
                    className={`policy-card ${selectedPolicy?.id === policy.id ? 'active' : ''}`}
                    onClick={() => setSelectedPolicy(policy)}
                  >
                    <h3>{policy.title}</h3>
                    <span className="last-updated">
                      Last updated: {policy.lastUpdated}
                    </span>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="policy-details">
          {selectedPolicy ? (
            <>
              <div className="policy-header">
                <h2>{selectedPolicy.title}</h2>
                <span className="category-badge">
                  {selectedPolicy.category}
                </span>
              </div>
              <div className="last-updated">
                Last updated: {selectedPolicy.lastUpdated}
              </div>
              <div className="policy-content">
                {selectedPolicy.content.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Select a policy from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Policies;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./OvertimeRequests.css";
// import RequestForm from "./RequestForm";
// import RequestList from "./RequestList";

// const OvertimeRequests = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3001/requests")
//       .then(response => {
//         console.log("Fetched Data:", response.data);
//         setRequests(response.data);
//       })
//       .catch(err => console.error("Error Fetching Data:", err));
//   }, []);

//   const handleFormSubmit = (formData) => {
//     const hours = calculateHours(formData.startTime, formData.endTime);
    
//     const email = localStorage.getItem("email");

//     const request = {
//       email,
//       id: requests.length + 1,
//       ...formData,
//       hours,
//       status: "Pending",
//     };

//     axios.post("http://localhost:3001/overtime-request", request)
//       .then(response => {
//         console.log("New Request Added:", response.data);
//         setRequests([response.data, ...requests]);
//         setShowForm(false);
//       })
//       .catch(err => console.error("Error Submitting Request:", err));
//   };

//   // const calculateHours = (start, end) => {
//   //   const d = new Date();
//   //   let startTime = d.getTime(`${start}`);
//   //   let endTime = d.getTime(`${end}`);
//   //   let diff = endTime - startTime;
//   //   return Math.round(diff / (1000 * 60 * 60));
//   // };

//   const calculateHours = (start, end) => {
//     const [startHour, startMinute] = start.split(":").map(Number);
//     const [endHour, endMinute] = end.split(":").map(Number);

//     let startTime = new Date();
//     startTime.setHours(startHour, startMinute, 0, 0);

//     let endTime = new Date();
//     endTime.setHours(endHour, endMinute, 0, 0);

//     let diff = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours

//     return diff; // Returns decimal hours (e.g., 2.5 for 2 hours 30 minutes)
//   };

//   return (
//     <div className="overtime-requests-container">
//       <div className="requests-header">
//         <h1>My Overtime Requests</h1>
//         <button 
//           className="new-request-btn"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Cancel" : "New Request"}
//         </button>
//       </div>

//       {showForm && (
//         <RequestForm 
//           onSubmit={handleFormSubmit}
//           onCancel={() => setShowForm(false)}
//         />
//       )}

//       <RequestList requests={requests} />
//     </div>
//   );
// };

// export default OvertimeRequests;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OvertimeRequests.css";
import RequestForm from "./RequestForm";
import RequestList from "./RequestList";

const OvertimeRequests = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([]);
  const email = localStorage.getItem("email"); // Retrieve logged-in user's email

  useEffect(() => {
    if (!email) {
      console.error("No email found in localStorage! Cannot fetch requests.");
      return;
    }

    axios.get(`http://localhost:3001/requests?email=${email}`)
      .then(response => {
        console.log("Fetched Data:", response.data);
        setRequests(response.data);
      })
      .catch(err => console.error("Error Fetching Data:", err));
  }, [email]);

  const handleFormSubmit = (formData) => {
    if (!email) {
      console.error("No email found! Cannot submit request.");
      return;
    }

    const hours = calculateHours(formData.startTime, formData.endTime);

    const request = {
      email, // Ensure email is sent with request
      id: requests.length + 1,
      ...formData,
      hours,
      status: "Pending",
    };

    axios.post("http://localhost:3001/overtime-request", request)
      .then(response => {
        console.log("New Request Added:", response.data);
        setRequests([response.data, ...requests]);
        setShowForm(false);
      })
      .catch(err => console.error("Error Submitting Request:", err));
  };

  const calculateHours = (start, end) => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    let startTime = new Date();
    startTime.setHours(startHour, startMinute, 0, 0);

    let endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);

    let diff = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours

    return diff; // Returns decimal hours (e.g., 2.5 for 2 hours 30 minutes)
  };

  return (
    <div className="overtime-requests-container">
      <div className="requests-header">
        <h1>My Overtime Requests</h1>
        <button 
          className="new-request-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "New Request"}
        </button>
      </div>

      {showForm && (
        <RequestForm 
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <RequestList requests={requests} />
    </div>
  );
};

export default OvertimeRequests;

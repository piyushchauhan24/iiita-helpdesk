import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/complaints");
      const data = await res.json();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints", error);
    }
  };

  const handleAssign = async (id) => {
    const assignedName = prompt("Enter name of assigned personnel:");
    const assignedContact = prompt("Enter phone number:");

    if (!assignedName || !assignedContact) return;

    try {
      const res = await fetch(`http://localhost:5000/api/complaints/${id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: assignedName, contact: assignedContact }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Personnel assigned!");
        fetchComplaints();
      } else {
        alert("Failed to assign");
      }
    } catch (error) {
      console.error("Error assigning personnel", error);
    }
  };

  return (
    <div className="dashboard-container">
      <style>{`
        .dashboard-container {
          max-width: 1100px;
          margin: 2rem auto;
          padding: 1rem;
        }
        .dashboard-title {
          font-size: 2rem;
          font-weight: bold;
          color: #4f46e5;
          margin-bottom: 1.5rem;
        }
        .no-complaints {
          color: #666;
          font-size: 1.1rem;
        }
        .complaint-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .complaint-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        .complaint-type {
          font-size: 1.2rem;
          font-weight: 600;
          color: #4338ca;
          margin-bottom: 0.75rem;
        }
        .complaint-details p {
          margin: 0.25rem 0;
          color: #333;
        }
        .status-tag {
          font-weight: bold;
          margin-left: 0.5rem;
        }
        .status-assigned {
          color: green;
        }
        .status-pending {
          color: orange;
        }
        .assign-button {
          margin-top: 1rem;
          padding: 0.5rem 1.2rem;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .assign-button:hover {
          background-color: #4338ca;
        }
        .assigned-info {
          margin-top: 1rem;
          color: green;
          font-weight: 600;
        }
      `}</style>

      <h2 className="dashboard-title">Admin Dashboard</h2>
      {complaints.length === 0 ? (
        <p className="no-complaints">No complaints found.</p>
      ) : (
        <div className="complaint-grid">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">
              <h3 className="complaint-type">{complaint.type}</h3>
              <div className="complaint-details">
                <p><strong>Roll No:</strong> {complaint.rollNumber}</p>
                <p><strong>Email:</strong> {complaint.email}</p>
                <p><strong>Location:</strong> {complaint.building} - {complaint.room}</p>
                <p><strong>Status:</strong>
                  <span className={`status-tag ${complaint.status === 'Assigned' ? 'status-assigned' : 'status-pending'}`}>
                    {complaint.status}
                  </span>
                </p>
                <p><strong>Description:</strong> {complaint.description}</p>
              </div>
              {complaint.assignedName ? (
                <div className="assigned-info">
                  Assigned to {complaint.assignedName} ({complaint.assignedContact})
                </div>
              ) : (
                <button className="assign-button" onClick={() => handleAssign(complaint.id)}>
                  Assign Personnel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

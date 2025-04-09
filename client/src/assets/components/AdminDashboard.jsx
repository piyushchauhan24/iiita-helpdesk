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
      const res = await fetch(
        `http://localhost:5000/api/complaints/${id}/assign`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: assignedName, contact: assignedContact }),
        }
      );

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
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Admin Dashboard
      </h2>

      {complaints.length === 0 ? (
        <p className="text-center text-gray-500">No complaints found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {complaint.type}
              </h3>

              <div className="text-sm text-gray-700 space-y-1 mb-4">
                <p>
                  <span className="font-medium">Roll No:</span>{" "}
                  {complaint.rollNumber}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {complaint.email}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {complaint.building} - {complaint.room}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      complaint.status === "Assigned"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {complaint.status}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Description:</span>{" "}
                  {complaint.description}
                </p>
              </div>

              {complaint.assignedName ? (
                <div className="text-sm text-green-700 font-medium bg-green-50 p-2 rounded-lg">
                  Assigned to {complaint.assignedName} (
                  {complaint.assignedContact})
                </div>
              ) : (
                <button
                  onClick={() => handleAssign(complaint.id)}
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition"
                >
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

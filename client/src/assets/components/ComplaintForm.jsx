import React, { useState } from "react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    rollNumber: "",
    type: "Cleaning",
    description: "",
    building: "",
    room: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { rollNumber, type, description, building, room } = formData;

    if (!rollNumber || !type || !description || !building || !room) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("Complaint submitted successfully");
        setFormData({
          rollNumber: "",
          type: "Cleaning",
          description: "",
          building: "",
          room: "",
        });
      } else {
        alert("Failed to submit complaint");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting complaint");
    }
  };

  return (
    <div className="complaint-form-container">
      <style>{`
        .complaint-form-container {
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 40rem;
          margin: 2rem auto;
          font-family: 'Segoe UI', sans-serif;
        }

        .complaint-form-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #4f46e5;
          margin-bottom: 1.25rem;
          text-align: center;
        }

        .complaint-form-group {
          margin-bottom: 1rem;
        }

        .complaint-form-label {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
          color: #374151;
        }

        .complaint-form-input,
        .complaint-form-select,
        .complaint-form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.95rem;
        }

        .complaint-form-input:focus,
        .complaint-form-select:focus,
        .complaint-form-textarea:focus {
          border-color: #6366f1;
          outline: none;
        }

        .complaint-form-submit {
          width: 100%;
          background-color: #4f46e5;
          color: white;
          font-weight: 600;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          cursor: pointer;
        }

        .complaint-form-submit:hover {
          background-color: #4338ca;
        }
      `}</style>

      <h2 className="complaint-form-title">Submit a Complaint</h2>

      <form onSubmit={handleSubmit}>
        <div className="complaint-form-group">
          <label className="complaint-form-label">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            className="complaint-form-input"
            required
          />
        </div>

        <div className="complaint-form-group">
          <label className="complaint-form-label">Complaint Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="complaint-form-select"
          >
            <option value="Cleaning">Cleaning</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Carpentry">Carpentry</option>
          </select>
        </div>

        <div className="complaint-form-group">
          <label className="complaint-form-label">Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="complaint-form-textarea"
            required
          />
        </div>

        <div className="complaint-form-group">
          <label className="complaint-form-label">Building</label>
          <input
            type="text"
            name="building"
            value={formData.building}
            onChange={handleChange}
            className="complaint-form-input"
            required
          />
        </div>

        <div className="complaint-form-group">
          <label className="complaint-form-label">Room</label>
          <input
            type="text"
            name="room"
            value={formData.room}
            onChange={handleChange}
            className="complaint-form-input"
            required
          />
        </div>

        <button type="submit" className="complaint-form-submit">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;

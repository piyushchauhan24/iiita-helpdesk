import React, { useState } from 'react';

const SubmitForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    rollNumber: '',
    email: '',
    building: '',
    room: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      alert('Complaint Submitted!');
      setFormData({
        type: '', description: '', rollNumber: '', email: '', building: '', room: ''
      });
    } else {
      alert('Error submitting complaint.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg border space-y-4">
      <h2 className="text-2xl font-bold">Submit Complaint</h2>
      <select name="type" value={formData.type} onChange={handleChange} required className="w-full p-2 border rounded">
        <option value="">Select Type</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Electrical">Electrical</option>
        <option value="Plumbing">Plumbing</option>
      </select>
      <input type="text" name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} required className="w-full p-2 border rounded"/>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded"/>
      <input type="text" name="building" placeholder="Building" value={formData.building} onChange={handleChange} required className="w-full p-2 border rounded"/>
      <input type="text" name="room" placeholder="Room" value={formData.room} onChange={handleChange} required className="w-full p-2 border rounded"/>
      <textarea name="description" placeholder="Describe your issue..." value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded"/>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
    </form>
  );
};

export default SubmitForm;

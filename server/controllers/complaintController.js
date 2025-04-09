const Complaint = require('../models/complaintModel');

// Handle submitting a complaint
exports.submitComplaint = (req, res) => {
  const { email, type, rollNumber, description, building, room } = req.body;

  // Basic validation
  if (!type || !rollNumber || !description || !building || !room) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all required fields',
    });
  }

  const complaint = { email, type, rollNumber, description, building, room };

  Complaint.createComplaint(complaint, (err, result) => {
    if (err) {
      console.error('❌ Error creating complaint:', err);
      return res.status(500).json({
        success: false,
        message: 'Internal server error while submitting complaint',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
    });
  });
};

// Handle fetching all complaints (admin view)
exports.getAllComplaints = (req, res) => {
  Complaint.getAll((err, results) => {
    if (err) {
      console.error('❌ Error fetching complaints:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch complaints',
      });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

// Handle assigning personnel to a complaint
exports.assignPersonnel = (req, res) => {
  const id = req.params.id;
  const { assignedName, assignedContact } = req.body;

  if (!assignedName || !assignedContact) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both name and contact of personnel',
    });
  }

  Complaint.assign(id, { assignedName, assignedContact }, (err, result) => {
    if (err) {
      console.error('❌ Error assigning personnel:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to assign personnel',
      });
    }

    res.json({
      success: true,
      message: 'Personnel assigned successfully',
    });
  });
};

// Get complaints for a specific user (by email)
exports.getComplaintsByUser = (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
    });
  }

  Complaint.getByEmail(email, (err, results) => {
    if (err) {
      console.error('❌ Error fetching user complaints:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch user complaints',
      });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

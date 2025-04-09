const db = require("../config/db");

const Complaint = {
  // Create a new complaint
  createComplaint: (complaint, callback) => {
    const { email, type, rollNumber, description, building, room } = complaint;

    const sql = `
      INSERT INTO complaints 
      (email, type, rollNumber, description, building, room) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [email, type, rollNumber, description, building, room], callback);
  },

  // Get all complaints (for admin)
  getAll: (callback) => {
    db.query("SELECT * FROM complaints", callback);
  },

  // Assign personnel to complaint
  assign: (id, personnel, callback) => {
    const sql = `
      UPDATE complaints 
      SET assignedName = ?, assignedContact = ?, status = 'Assigned', updatedAt = NOW() 
      WHERE id = ?
    `;
    db.query(sql, [personnel.assignedName, personnel.assignedContact, id], callback);
  },

  // Get complaints by email
  getByEmail: (email, callback) => {
    const sql = "SELECT * FROM complaints WHERE email = ?";
    db.query(sql, [email], callback);
  },
};

module.exports = Complaint;

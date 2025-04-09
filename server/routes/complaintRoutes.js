const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");

router.post("/complaints", complaintController.submitComplaint);
router.get("/complaints", complaintController.getAllComplaints);
router.put("/complaints/:id/assign", complaintController.assignPersonnel);
router.get("/complaints/user/:email", complaintController.getComplaintsByUser);

module.exports = router;

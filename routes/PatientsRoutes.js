const express = require("express");
const patientsController = require("../controllers/patientsController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/patients", verifyToken, authorizeRoles("admin", "doctor"), patientsController.getAllPatients);

module.exports = router;

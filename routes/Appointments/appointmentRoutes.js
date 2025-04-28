const express = require("express");
const appointmentsController = require("../../controllers/Appointments/appointmentController");
const {
  verifyToken,
  authorizeRoles,
} = require("../../middlewares/authMiddleware");
const router = express.Router();

router.get(
  "/appointments",
  verifyToken,
  authorizeRoles("patient", "admin", "doctor"),
  appointmentsController.getAllAppointments
);

module.exports = router;

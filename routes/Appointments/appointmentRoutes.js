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

router.get(
  "/appointments/user/:userId",
  verifyToken,
  authorizeRoles("patient", "admin", "doctor"),
  appointmentsController.getAppointmentsByUser
);

router.get(
  "/appointments/familynames/:userId",
  verifyToken,
  authorizeRoles("patient"),
  appointmentsController.getFamilyNames
);

module.exports = router;

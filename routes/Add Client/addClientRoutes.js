const express = require("express");
const addClientController = require("../../controllers/Add Client/addClientController");
const {
  verifyToken,
  authorizeRoles,
} = require("../../middlewares/authMiddleware");
const router = express.Router();

router.get(
  "/addClient",
  verifyToken,
  authorizeRoles("admin"),
  addClientController.getAllClients
);
router.post(
  "/addClient",
  verifyToken,
  authorizeRoles("admin"),
  addClientController.creatClient
);

module.exports = router;

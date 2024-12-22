const express = require("express");
const updateEmployeeController = require("../../../controllers/Employee/Update Employee/updateEmloyeeController");
const router = express.Router();

router.post(
  "/employee/updateEmployee",
  updateEmployeeController.updateEmployee
);

module.exports = router;

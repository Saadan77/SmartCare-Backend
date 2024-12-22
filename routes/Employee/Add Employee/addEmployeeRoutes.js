const express = require("express");
const addEmployeeController = require("../../../controllers/Employee/Add Employee/addEmployeeController");
const router = express.Router();

router.post("/employee/addEmployee", addEmployeeController.createEmployee);

module.exports = router;

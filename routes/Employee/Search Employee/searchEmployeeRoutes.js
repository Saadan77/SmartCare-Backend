const express = require("express");
const searchEmployeeController = require("../../../controllers/Employee/Search Employee/searchEmployeeController");
const router = express.Router();

router.get("/employee/searchEmployee", searchEmployeeController.searchEmployee);

module.exports = router;

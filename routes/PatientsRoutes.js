const express = require("express");
const patientsController = require("../controllers/patientsController");
const router = express.Router();

router.get("/patients", patientsController.getAllPatients);

module.exports = router;

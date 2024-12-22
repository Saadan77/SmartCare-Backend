const express = require("express");
const addServiceController = require("../../../controllers/Service Setup Conroller/Add Service/addServiceController");
const router = express.Router();

router.get("/services/addService", addServiceController.getAllServices);

module.exports = router;

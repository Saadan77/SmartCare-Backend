const express = require("express");
const addSubGroupController = require("../../../controllers/Service Setup Conroller/Add SubGroup/addSubGroupController");
const router = express.Router();

router.get("/services/addSubGroup", addSubGroupController.getAllSubGroups);
router.post("/services/addSubGroup", addSubGroupController.createSubGroup);

module.exports = router;

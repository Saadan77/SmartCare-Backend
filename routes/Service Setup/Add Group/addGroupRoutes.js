const express = require("express");
const addGroupController = require("../../../controllers/Service Setup Conroller/Add Group/addGroupController");
const router = express.Router();

router.get("/services/addGroup", addGroupController.getAllGroups);
router.post("/services/addGroup", addGroupController.createGroup);
router.delete("/services/addGroup/:groupId", addGroupController.deleteGroup);

module.exports = router;

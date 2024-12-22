const express = require("express");
const addClientController = require("../../controllers/Add Client/addClientController");
const router = express.Router();

router.get("/addClient", addClientController.getAllClients);
router.post("/addClient", addClientController.creatClient);

module.exports = router;

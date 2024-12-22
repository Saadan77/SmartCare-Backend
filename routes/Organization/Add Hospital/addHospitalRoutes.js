const express = require("express");
const addHospitalController = require("../../../controllers/Organization/Add Hospital/addHospitalController");
const router = express.Router();

router.get("/addHospital", addHospitalController.getAllHospitals);
// router.post("/addHospital", addHospitalController.creatClient);
// router.delete("/services/addGroup/:groupId", addHospitalController.deleteGroup);

module.exports = router;

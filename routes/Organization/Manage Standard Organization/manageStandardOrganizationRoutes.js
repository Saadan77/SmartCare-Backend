const express = require("express");
const ManageStandardOrganizationController = require("../../../controllers/Organization/Manage Standard Organization/manageStandardOrganizationController");
const router = express.Router();

router.get(
  "/organization/ManageStandardOrganization",
  ManageStandardOrganizationController.getAllStandardOrganizations
);
router.post(
  "/organization/ManageStandardOrganization",
  ManageStandardOrganizationController.createStandardOrganization
);

module.exports = router;

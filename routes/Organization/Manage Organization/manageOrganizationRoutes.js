const express = require("express");
const manageOrganizationController = require("../../../controllers/Organization/Manage Organization/manageOrganizationContoller");
const router = express.Router();

router.get(
  "/getOrganizationTypes",
  manageOrganizationController.getOrganizationTypes
);
router.get(
  "/getOrganizationNatures",
  manageOrganizationController.getOrganizationNatures
);
router.get(
  "/getOrganizationSpeciality",
  manageOrganizationController.getOrganizationSpeciality
);
router.get(
  "/getOrganizationRegions",
  manageOrganizationController.getOrganizationRegions
);
router.get(
  "/getOrganizationCategory",
  manageOrganizationController.getOrganizationCategory
);
router.post(
  "/organization/ManageOrganization",
  manageOrganizationController.insertOrganization
);

module.exports = router;

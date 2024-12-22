const manageOrganizationModel = require("../../../models/Organization/Manage Organization/manageOrganizationModel");

const getOrganizationTypes = async (req, res) => {
  try {
    const types = await manageOrganizationModel.getOrganizationTypes();
    res.json(types); // Send the data as JSON response
  } catch (err) {
    console.error("Error fetching Organization Types:", err);
    res.status(500).send("Error fetching Organization Types");
  }
};

const getOrganizationNatures = async (req, res) => {
  try {
    const natures = await manageOrganizationModel.getOrganizationNatures();
    res.json(natures);
  } catch (err) {
    console.error("Error fetching Organization Natures:", err);
    res.status(500).send("Error fetching Organization Natures");
  }
};

const getOrganizationSpeciality = async (req, res) => {
  try {
    const specialities =
      await manageOrganizationModel.getOrganizationSpeciality();
    res.json(specialities);
  } catch (err) {
    console.error("Error fetching Organization Specialities:", err);
    res.status(500).send("Error fetching Organization Specialities");
  }
};

const getOrganizationRegions = async (req, res) => {
  try {
    const regions = await manageOrganizationModel.getOrganizationRegions();
    res.json(regions);
  } catch (err) {
    console.error("Error fetching Organization Regions:", err);
    res.status(500).send("Error fetching Organization Regions");
  }
};

const getOrganizationCategory = async (req, res) => {
  try {
    const categories = await manageOrganizationModel.getOrganizationCategory();
    res.json(categories);
  } catch (err) {
    console.error("Error fetching Organization Categories:", err);
    res.status(500).send("Error fetching Organization Categories");
  }
};

const insertOrganization = async (req, res) => {
  const {
    organizationUnitID,
    organizationTypeID,
    organizationNatureID,
    regionID,
    categoryID,
    specialtyID,
    parentOrganizationID,
    discountPercentage,
    displayName,
    phone1,
    phone2,
    fax,
    email,
    travelingTimeDays,
    travelingTimeHours,
    country,
    province,
    district,
    city,
    address,
    createdBy,
  } = req.body;

  try {
    const newOrganization = await manageOrganizationModel.insertOrganization(
      organizationUnitID,
      organizationTypeID,
      organizationNatureID,
      regionID,
      categoryID,
      specialtyID,
      parentOrganizationID,
      discountPercentage,
      displayName,
      phone1,
      phone2,
      fax,
      email,
      travelingTimeDays,
      travelingTimeHours,
      country,
      province,
      district,
      city,
      address,
      createdBy
    );
    res.json(newOrganization);
  } catch (error) {
    console.error("Error inserting organization:", error);
    res.status(500).send("Error inserting organization.");
  }
};

module.exports = {
  getOrganizationTypes,
  getOrganizationNatures,
  getOrganizationSpeciality,
  getOrganizationRegions,
  getOrganizationCategory,
  insertOrganization,
};

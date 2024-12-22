const ManageStandardOrganizationModel = require("../../../models/Organization/Manage Standard Organization/manageStandardOrganizationModel");

const getAllStandardOrganizations = async (req, res) => {
  try {
    const standardOrganizations =
      await ManageStandardOrganizationModel.getAllStandardOrganizations();
    console.log("Standard Organizations fetched:", standardOrganizations); // Debugging log
    res.json(standardOrganizations); // Make sure you are sending a proper response
  } catch (err) {
    console.error("Error fetching Standard Organizations:", err);
    res.status(500).send("Error fetching Standard Organizations"); // Handle errors properly
  }
};

const createStandardOrganization = async (req, res) => {
  const {
    Name: standardOrganizationName,
    Description: description,
    CreatedBy: createdBy,
  } = req.body;
  try {
    const insertedStandardOrganization =
      await ManageStandardOrganizationModel.insertStandardOrganization(
        standardOrganizationName,
        description,
        createdBy
      );
    res.status(201).json(insertedStandardOrganization);
  } catch (err) {
    console.error("Error creating Standard Organization:", err);
    res.status(500).send("Error creating Standard Organization");
  }
};

module.exports = {
  getAllStandardOrganizations,
  createStandardOrganization,
};

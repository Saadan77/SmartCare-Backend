const subGroupsModel = require("../../../models/Service Setup Model/Add SubGroup/addSubGroupModel");

const getAllSubGroups = async (req, res) => {
  try {
    const subGroups = await subGroupsModel.getAllSubGroups();
    console.log("SubGroups fetched:", subGroups); // Debugging log
    res.json(subGroups); // Make sure you are sending a proper response
  } catch (err) {
    console.error("Error fetching subgroups:", err);
    res.status(500).send("Error fetching subgroups"); // Handle errors properly
  }
};

const createSubGroup = async (req, res) => {
  const { groupId, subGroupName, createdBy } = req.body;
  try {
    const insertedSubGroup = await subGroupsModel.insertSubGroup(
      groupId,
      subGroupName,
      createdBy
    );
    res.status(201).json(insertedSubGroup);
  } catch (err) {
    console.error("Error creating sub group:", err);
    res.status(500).send("Error creating sub group");
  }
};

module.exports = {
  getAllSubGroups,
  createSubGroup,
};

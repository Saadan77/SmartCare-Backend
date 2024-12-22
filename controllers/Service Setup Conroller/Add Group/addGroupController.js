const groupsModel = require("../../../models/Service Setup Model/Add Group/addGroupModel");

const getAllGroups = async (req, res) => {
  try {
    const groups = await groupsModel.getAllGroups();
    res.json(groups);
  } catch (err) {
    console.error("Error fetching groups:", err);
    res.status(500).send("Error fetching groups");
  }
};

const createGroup = async (req, res) => {
  const { groupName, createdBy } = req.body;
  try {
    const insertedGroup = await groupsModel.insertGroup(groupName, createdBy); // Return inserted group
    res.status(201).json(insertedGroup); // Send the created group as a response
  } catch (err) {
    console.error("Error creating group:", err);
    res.status(500).send("Error creating group");
  }
};

const deleteGroup = async (req, res) => {
  const { groupId } = req.params; // Retrieve `groupId` from the URL
  try {
    const success = await groupsModel.deleteGroup(groupId);
    if (success) {
      res.status(200).send("Group deleted successfully");
    } else {
      res.status(404).send("Group not found");
    }
  } catch (err) {
    console.error("Error deleting group:", err);
    res.status(500).send("Error deleting group");
  }
};

module.exports = {
  getAllGroups,
  createGroup,
  deleteGroup,
};

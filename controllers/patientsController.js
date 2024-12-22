const patientsModel = require("../models/patientsModel");

const getAllPatients = async (req, res) => {
  console.log('API /api/patients called');
  try {
    const patients = await patientsModel.getAllPatients();
    console.log('Patients fetched:', patients); // Debugging log
    res.json(patients); // Make sure you are sending a proper response
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).send("Error fetching patients"); // Handle errors properly
  }
};

module.exports = {
  getAllPatients,
};

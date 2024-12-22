const serviceModel = require("../../../models/Service Setup Model/Add Service/addServiceModel");

const getAllServices = async (req, res) => {
  console.log('API /api/services/addSubGroup called');
  try {
    const service = await serviceModel.getAllServices();
    console.log('Services fetched:', service); // Debugging log
    res.json(service); // Make sure you are sending a proper response
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).send("Error fetching services"); // Handle errors properly
  }
};

module.exports = {
    getAllServices,
};

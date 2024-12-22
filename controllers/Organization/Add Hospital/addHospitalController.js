const addHospitalModel = require("../../../models/Organization/Add Hospital/addHospitalModel");

const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await addHospitalModel.getAlHospitals();
    console.log("Hospitals fetched:", hospitals); // Debugging log
    res.json(hospitals); // Make sure you are sending a proper response
  } catch (err) {
    console.error("Error fetching hospitals:", err);
    res.status(500).send("Error fetching hospitals"); // Handle errors properly
  }
};

module.exports = {
  getAllHospitals,
};

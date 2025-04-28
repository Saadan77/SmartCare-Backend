const appointmentModel = require("../../models/Appointments/appointmentModel");

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAllAppointments();
    console.log("Appoinments: ", appointments);
    res.json(appointments);
  } catch (error) {
    console.log("Error getting appointments", error);
    res.status(500).send("Error getting appointments");
  }
};

module.exports = {
  getAllAppointments,
};

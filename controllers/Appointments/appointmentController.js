const appointmentModel = require("../../models/Appointments/appointmentModel");
const dayjs = require("dayjs");
const familyMemberNames = require("../../models/Appointments/appointmentModel");

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

const getAppointmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await appointmentModel.getAppointmentsByUserId(userId);

    if (!appointments.length) {
      return res
        .status(404)
        .json({ message: "No appointments found for this user." });
    }

    const formattedAppointments = appointments.map((a) => ({
      ...a,
      appointment_date: dayjs(a.appointment_date).format("YYYY-MM-DD"),
      appointment_time: dayjs(a.appointment_time).format("HH:mm"),
      created_at: dayjs(a.created_at).format("YYYY-MM-DD"),
      updated_at: dayjs(a.updated_at).format("YYYY-MM-DD"),
    }));

    res.json(formattedAppointments);
  } catch (error) {
    console.error("Error getting appointments by user:", error);
    res.status(500).send("Server error while fetching appointments");
  }
};

const getFamilyNames = async (req, res) => {
  try {
    const { userId } = req.params;
    const family_names = await familyMemberNames.getFamilyMemberNames(userId);
    res.json(family_names);
  } catch (error) {
    console.log("Error fetching names by id:", error);
    res.status(500).send("Error fetching family member names");
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentsByUser,
  getFamilyNames,
};

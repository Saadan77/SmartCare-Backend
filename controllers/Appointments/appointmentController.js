const appointmentModel = require("../../models/Appointments/appointmentModel");
const dayjs = require("dayjs");

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
      return res.status(404).json({ message: "No appointments found for this user." });
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

module.exports = {
  getAllAppointments,
  getAppointmentsByUser,
};

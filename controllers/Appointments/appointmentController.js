const appointmentModel = require("../../models/Appointments/appointmentModel");
const dayjs = require("dayjs");
const familyMemberNames = require("../../models/Appointments/appointmentModel");
const doctorNamesModel = require("../../models/Appointments/appointmentModel");
const createAppointmentController = require("../../models/Appointments/appointmentModel");

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

const getDoctorNamesController = async (req, res) => {
  try {
    const doctor_names = await doctorNamesModel.getDoctorNames();

    const formattedDoctorsAndTime = doctor_names.map((d) => ({
      ...d,
      start_time: dayjs(d.start_time).format("HH:mm"),
      end_time: dayjs(d.end_time).format("HH:mm"),
    }));

    res.json(formattedDoctorsAndTime);
  } catch (error) {
    console.log("Controller: Error fetching doctor names:", error);
    res.status(500).send("Controller Status: Error fetching doctor names");
  }
};

const createAppointmentControllerMethod = async (req, res) => {
  const {
    id,
    family_member_id,
    doctor_id,
    appointment_date,
    appointment_time,
    reason,
    status,
  } = req.body;

  try {
    const appointmentModelData =
      await createAppointmentController.createAppointmentModel(
        id,
        family_member_id,
        doctor_id,
        appointment_date,
        appointment_time,
        reason,
        status
      );

    res.status(201).json(appointmentModelData);
  } catch (error) {
    console.error("Controller: Error creating appointment:", error);
    res
      .status(500)
      .send("Controller Status: Error creating appointment:", error);
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentsByUser,
  getFamilyNames,
  getDoctorNamesController,
  createAppointmentControllerMethod,
};

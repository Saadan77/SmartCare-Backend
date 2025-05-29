const appointmentModel = require("../../models/Appointments/appointmentModel");
const dayjs = require("dayjs");
const familyMemberNames = require("../../models/Appointments/appointmentModel");
const doctorNamesModel = require("../../models/Appointments/appointmentModel");
const createAppointmentController = require("../../models/Appointments/appointmentModel");

const { sql } = require("../../config/dbConfig");

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

    const appointment = appointmentModelData[0];

    const familyMemberResult = await sql.query`
      SELECT full_name FROM dbo.FamilyMembers WHERE family_member_id = ${family_member_id}
    `;

    const doctorResult = await sql.query`
      SELECT doctor_name FROM dbo.Doctors WHERE doctor_id = ${doctor_id}
    `;

    const familyMemberName =
      familyMemberResult.recordset.length > 0
        ? familyMemberResult.recordset[0].full_name
        : null;

    const doctorName =
      doctorResult.recordset.length > 0
        ? doctorResult.recordset[0].doctor_name
        : null;

    const formattedTime = new Date(appointment.appointment_time)
      .toISOString()
      .substring(11, 16);

    const responseData = {
      ...appointment,
      appointment_time: formattedTime,
      family_member_name: familyMemberName,
      doctor_name: doctorName,
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error("Controller: Error creating appointment:", error);
    res
      .status(500)
      .json({ error: "Failed to create appointment", details: error.message });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentsByUser,
  getFamilyNames,
  getDoctorNamesController,
  createAppointmentControllerMethod,
};

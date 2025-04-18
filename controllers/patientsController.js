const patientsModel = require("../models/patientsModel");
const { sendEmail } = require("../services/emailService");
const { sendSMS } = require("../services/smsService");

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

const createPatient = async (req, res) => {
  const {
    fullName,
    gender,
    maritalStatus,
    dateOfBirth,
    nationality,
    address,
    city,
    area,
    phoneNumber,
    alternatePhoneNumber,
    emailAddress,
    nationalIdSsn,
    passportNumber,
    driversLicenseNumber,
    photoId,
    emergencyContactName,
    relationship,
    emergencyContactNumber,
    alternateEmergencyContactNumber,
    insurance,
  } = req.body;

  try {
    const newPatient = await patientsModel.insertPatient(
      fullName,
      gender,
      maritalStatus,
      dateOfBirth,
      nationality,
      address,
      city,
      area,
      phoneNumber,
      alternatePhoneNumber,
      emailAddress,
      nationalIdSsn,
      passportNumber,
      driversLicenseNumber,
      photoId,
      emergencyContactName,
      relationship,
      emergencyContactNumber,
      alternateEmergencyContactNumber,
      insurance
    );

    await sendEmail(
      "saadanjawad50@gmail.com",
      "New Patient Registered",
      `A new patient "${fullName}" has been successfully added.`
    );

    await sendSMS("+923213101228", `New Patient Added: "${fullName}".`);

    res.status(201).json(newPatient);
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).send("Error creating patient");
  }
};

const getPatientById = async (patientId) => {
  try {
    const result = await sql.query`SELECT * FROM dbo.[Patient] WHERE PatientID = ${patientId}`;
    return result.recordset[0];
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw error;
  }
};

module.exports = {
  getAllPatients,
  createPatient,
  getPatientById
};

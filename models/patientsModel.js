const { sql } = require("../config/dbConfig");

const getAllPatients = async () => {
  try {
    const result = await sql.query`SELECT * FROM dbo.[Add Patient]`;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

const insertPatient = async (
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
) => {
  try {
    const result = await sql.query`
      INSERT INTO dbo.[Patient] (
        FullName, Gender, MaritalStatus, DateOfBirth, Nationality, Address, 
        City, Area, PhoneNumber, AlternatePhoneNumber, EmailAddress, 
        NationalID_SSN, PassportNumber, DriversLicenseNumber, PhotoID, 
        EmergencyContactName, Relationship, EmergencyContactNumber, 
        AlternateEmergencyContactNumber, Insurance, CreatedDate
      )
      OUTPUT INSERTED.*
      VALUES (
        ${fullName}, ${gender}, ${maritalStatus}, ${dateOfBirth}, ${nationality}, 
        ${address}, ${city}, ${area}, ${phoneNumber}, ${alternatePhoneNumber}, 
        ${emailAddress}, ${nationalIdSsn}, ${passportNumber}, ${driversLicenseNumber}, 
        ${photoId}, ${emergencyContactName}, ${relationship}, ${emergencyContactNumber}, 
        ${alternateEmergencyContactNumber}, ${insurance}, GETDATE()
      );
    `;
    return result.recordset[0];
  } catch (error) {
    console.error("Error inserting patient:", error);
    throw error;
  }
};

module.exports = {
  getAllPatients,
  insertPatient
};

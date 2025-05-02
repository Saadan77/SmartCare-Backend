const { sql } = require("../../config/dbConfig");

const getAllAppointments = async () => {
  try {
    const result = await sql.query`SELECT * FROM dbo.[Appointments]`;
    return result.recordset;
  } catch (error) {
    console.error("Error getting appointments: ", error);
    throw error;
  }
};

const getAppointmentsByUserId = async (userId) => {
  try {
    const result = await sql.query`
        SELECT 
          A.*,
          F.full_name AS family_member_name,
          D.doctor_name AS doctor_name
        FROM dbo.Appointments A
        INNER JOIN dbo.FamilyMembers F ON A.family_member_id = F.family_member_id
        INNER JOIN dbo.Doctors D ON A.doctor_id = D.doctor_id
        WHERE A.id = ${userId}
      `;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching appointments by user ID:", error);
    throw error;
  }
};

const getFamilyMemberNames = async (userId) => {
  try {
    const names = await sql.query`
    SELECT id, full_name, family_member_id
    FROM dbo.FamilyMembers
    WHERE id = ${userId}
    `;
    return names.recordset;
  } catch (error) {
    console.log("Error fetching names by user ID:", error);
    throw error;
  }
};

const getDoctorNames = async () => {
  try {
    const doctorNames = await sql.query`SELECT doctor_name, start_time, end_time from dbo.Doctors`;
    console.log("Model: Doctor Names = ", doctorNames.recordset);
    return doctorNames.recordset;
  } catch (error) {
    console.log("Error fetching doctor names:", error);
    throw error;
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentsByUserId,
  getFamilyMemberNames,
  getDoctorNames
};

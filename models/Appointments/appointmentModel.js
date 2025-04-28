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

module.exports = {
  getAllAppointments,
};

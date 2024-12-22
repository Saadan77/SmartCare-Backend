const { sql } = require("../../../config/dbConfig");

const getAlHospitals = async () => {
  try {
    const result = await sql.query`SELECT * FROM dbo.[Hospital]`;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    throw error;
  }
};

module.exports = {
  getAlHospitals,
};

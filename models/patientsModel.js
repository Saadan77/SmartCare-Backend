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

module.exports = {
  getAllPatients,
};

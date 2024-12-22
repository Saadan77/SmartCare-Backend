const { sql } = require("../../../config/dbConfig");

const getAllServices = async () => {
  try {
    const result = await sql.query`SELECT * FROM dbo.[Service]`;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching Services:", error);
    throw error;
  }
};

module.exports = {
    getAllServices,
};

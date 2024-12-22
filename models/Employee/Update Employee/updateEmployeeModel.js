const { sql } = require("../../../config/dbConfig");

const updateEmployee = async ({ employeeNo, username, password, status }) => {
  try {
    const result = await sql.query`
      INSERT INTO dbo.[Login] (
        [EmployeeNo],
        [Username],
        [Password],
        [LoginStatus]
      )
      OUTPUT INSERTED.*
      VALUES (
        ${employeeNo},
        ${username},
        ${password},
        ${status}
      );
    `;
    return result.recordset[0];
  } catch (error) {
    console.error("Model: Error updating employee:", error);
    throw error;
  }
};

module.exports = { updateEmployee };

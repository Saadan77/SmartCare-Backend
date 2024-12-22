const { sql } = require("../../../config/dbConfig");

const searchEmployee = async ({
  employeeNo,
  firstName,
  middleName,
  lastName,
  gender,
  cnic,
  dateOfBirth,
}) => {
  try {
    const result = await sql.query`
      SELECT 
        e.*,
        l.LoginStatus AS LoginStatus
      FROM dbo.Employee e
      LEFT JOIN dbo.Login l ON e.EmployeeNo = l.EmployeeNo
      WHERE 
        (${employeeNo} IS NULL OR e.EmployeeNo = ${employeeNo}) AND
        (${firstName} IS NULL OR e.FirstName LIKE '%' + ${firstName} + '%') AND
        (${middleName} IS NULL OR e.MiddleName LIKE '%' + ${middleName} + '%') AND
        (${lastName} IS NULL OR e.LastName LIKE '%' + ${lastName} + '%') AND
        (${gender} IS NULL OR e.Gender = ${gender}) AND
        (${cnic} IS NULL OR e.CNIC = ${cnic}) AND
        (${dateOfBirth} IS NULL OR e.DateOfBirth = ${dateOfBirth});
    `;
    return result.recordset;
  } catch (error) {
    console.error("Model: Error searching employee:", error);
    throw error;
  }
};

module.exports = { searchEmployee };

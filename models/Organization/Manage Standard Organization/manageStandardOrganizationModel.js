const { sql } = require("../../../config/dbConfig");

const getAllStandardOrganizations = async () => {
  try {
    const result =
      await sql.query`SELECT * FROM dbo.[ManageStandardOrganization]`;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching Standard Organizations:", error);
    throw error;
  }
};

const insertStandardOrganization = async (
  standardOrganizationName,
  description,
  createdBy
) => {
  try {
    if (!standardOrganizationName) {
      throw new Error("The 'Name' field is required.");
    }

    const result = await sql.query`
        INSERT INTO dbo.[ManageStandardOrganization] 
          ([Name], [Description], [CreatedBy], [CreatedDate])
        OUTPUT INSERTED.*
        VALUES (${standardOrganizationName}, ${description}, ${createdBy}, GETDATE());
      `;
    return result.recordset[0];
  } catch (error) {
    console.error("Error inserting Standard Organization:", error);
    throw error;
  }
};

module.exports = {
  getAllStandardOrganizations,
  insertStandardOrganization,
};

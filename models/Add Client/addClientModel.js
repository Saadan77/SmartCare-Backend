const { sql } = require("../../config/dbConfig");

const getAllClients = async () => {
  try {
    const result = await sql.query`SELECT * FROM dbo.[Client]`;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

const insertClient = async (
  name,
  theme,
  adminUser,
  adminPassword,
  dbUser,
  dbPassword,
  createdBy
) => {
  try {
    const result = await sql.query`
  INSERT INTO dbo.[Client] ([Name], [Theme], [AdminUser], [AdminPassword], [DbUser], [DbPassword], [CreatedBy], [CreatedDate])
  OUTPUT INSERTED.*
  VALUES (${name}, ${theme}, ${adminUser}, ${adminPassword}, ${dbUser}, ${dbPassword}, ${createdBy}, GETDATE());
`;
    return result.recordset[0];
  } catch (error) {
    console.error("Error inserting client:", error);
    throw error;
  }
};

module.exports = {
  getAllClients,
  insertClient,
};

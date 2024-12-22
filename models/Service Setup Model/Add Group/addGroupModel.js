const { sql } = require("../../../config/dbConfig");

const getAllGroups = async () => {
  try {
    const result = await sql.query`
      SELECT * FROM dbo.[Group] WHERE IsDeleted = 0
    `;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
};

const insertGroup = async (groupName, createdBy) => {
  try {
    const result = await sql.query`
      INSERT INTO dbo.[Group] (GroupName, CreatedBy, CreatedDate)
      OUTPUT INSERTED.* -- Return the inserted row
      VALUES (${groupName}, ${createdBy}, GETDATE());
    `;
    return result.recordset[0]; // Return the first (and only) inserted record
  } catch (error) {
    console.error("Error inserting group:", error);
    throw error;
  }
};

const deleteGroup = async (groupId) => {
  try {
    const result = await sql.query`
      UPDATE dbo.[Group]
      SET IsDeleted = 1
      WHERE GroupId = ${groupId}
    `;
    return result.rowsAffected[0] > 0;
  } catch (error) {
    console.error("Error deleting group:", error);
    throw error;
  }
};

module.exports = {
  getAllGroups,
  insertGroup,
  deleteGroup,
};

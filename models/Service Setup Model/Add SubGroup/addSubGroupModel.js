const { sql } = require("../../../config/dbConfig");

const getAllSubGroups = async () => {
  try {
    const result = await sql.query`SELECT * FROM dbo.[SubGroup]`;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching subgroups:", error);
    throw error;
  }
};

const insertSubGroup = async (groupId, subGroupName, createdBy) => {
  try {
    const result = await sql.query`
      INSERT INTO dbo.[SubGroup] (GroupId, SubGroupName, CreatedBy, CreatedDate)
      OUTPUT INSERTED.*
      VALUES (${groupId}, ${subGroupName}, ${createdBy}, GETDATE());
    `;
    return result.recordset[0];
  } catch (error) {
    console.error("Error inserting sub group:", error);
    throw error;
  }
};

module.exports = {
  getAllSubGroups,
  insertSubGroup,
};

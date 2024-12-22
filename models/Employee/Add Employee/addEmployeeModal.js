const { sql } = require("../../../config/dbConfig");

// const getAllEmployees = async () => {
//   try {
//     const result = await sql.query`SELECT * FROM dbo.[Employee]`;
//     return result.recordset;
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     throw error;
//   }
// };

const insertEmployee = async ({
  title,
  employeeNo,
  gender,
  firstName,
  middleName,
  lastName,
  relationship,
  relationshipFirstName,
  relationshipMiddleName,
  relationshipLastName,
  dateOfBirth,
  maritalStatus,
  bloodGroup,
  cnic,
  nationality,
  phoneOffice,
  phoneResidence,
  email,
  mobile,
  fax,
  uniqueKeyType,
  uniqueKey,
  currentCountry,
  currentProvince,
  currentDistrict,
  currentCity,
  currentAddress,
  permanentCountry,
  permanentProvince,
  permanentDistrict,
  permanentCity,
  permanentAddress,
  createdBy,
  isDeleted,
}) => {
  try {
    const result = await sql.query`
      INSERT INTO dbo.[Employee] (
        [Title],
        [EmployeeNo],
        [Gender],
        [FirstName],
        [MiddleName],
        [LastName],
        [Relationship],
        [RelationshipFirstName],
        [RelationshipMiddleName],
        [RelationshipLastName],
        [DateOfBirth],
        [MaritalStatus],
        [BloodGroup],
        [CNIC],
        [Nationality],
        [PhoneOffice],
        [PhoneResidence],
        [Email],
        [Mobile],
        [Fax],
        [UniqueKeyType],
        [UniqueKey],
        [CurrentCountry],
        [CurrentProvince],
        [CurrentDistrict],
        [CurrentCity],
        [CurrentAddress],
        [PermanentCountry],
        [PermanentProvince],
        [PermanentDistrict],
        [PermanentCity],
        [PermanentAddress],
        [CreatedBy],
        [CreatedDate],
        [IsDeleted]
      )
      OUTPUT INSERTED.*
      VALUES (
        ${title},
        ${employeeNo},
        ${gender},
        ${firstName},
        ${middleName},
        ${lastName},
        ${relationship},
        ${relationshipFirstName},
        ${relationshipMiddleName},
        ${relationshipLastName},
        ${dateOfBirth},
        ${maritalStatus},
        ${bloodGroup},
        ${cnic},
        ${nationality},
        ${phoneOffice},
        ${phoneResidence},
        ${email},
        ${mobile},
        ${fax},
        ${uniqueKeyType},
        ${uniqueKey},
        ${currentCountry},
        ${currentProvince},
        ${currentDistrict},
        ${currentCity},
        ${currentAddress},
        ${permanentCountry},
        ${permanentProvince},
        ${permanentDistrict},
        ${permanentCity},
        ${permanentAddress},
        ${createdBy},
        GETDATE(),
        ${isDeleted}
      );
    `;
    return result.recordset[0];
  } catch (error) {
    console.error("Modal: Error inserting employee:", error);
    throw error;
  }
};

module.exports = {
  insertEmployee,
};

const { sql } = require("../../../config/dbConfig");

// Function to fetch Organization Types
const getOrganizationTypes = async () => {
  try {
    const result = await sql.query`
      SELECT LookupValue, SetupLookupChildID, SetupLookupParentID 
      FROM dbo.[SetupLookupChild]
      WHERE SetupLookupParentID = (
        SELECT SetupLookupParentID 
        FROM dbo.[SetupLookupParent] 
        WHERE LookupName = 'Organization Type'
      )
    `;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching Organization Types:", error);
    throw error;
  }
};

// Function to fetch Organization Natures
const getOrganizationNatures = async () => {
  try {
    const result = await sql.query`
      SELECT LookupValue, SetupLookupChildID, SetupLookupParentID 
      FROM dbo.[SetupLookupChild]
      WHERE SetupLookupParentID = (
        SELECT SetupLookupParentID 
        FROM dbo.[SetupLookupParent] 
        WHERE LookupName = 'Organization Nature'
      )
    `;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching Organization Natures:", error);
    throw error;
  }
};

// Function to fetch Organization Speciality
const getOrganizationSpeciality = async () => {
  try {
    const result = await sql.query`
      SELECT LookupValue, SetupLookupChildID, SetupLookupParentID 
      FROM dbo.[SetupLookupChild]
      WHERE SetupLookupParentID = (
        SELECT SetupLookupParentID 
        FROM dbo.[SetupLookupParent] 
        WHERE LookupName = 'Speciality'
      )
    `;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching Organization Speciality:", error);
    throw error;
  }
};

// Function to fetch Organization Regions
const getOrganizationRegions = async () => {
  try {
    const result = await sql.query`
      SELECT LookupValue, SetupLookupChildID, SetupLookupParentID 
      FROM dbo.[SetupLookupChild]
      WHERE SetupLookupParentID = (
        SELECT SetupLookupParentID 
        FROM dbo.[SetupLookupParent] 
        WHERE LookupName = 'Region'
      )
    `;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching Organization Regions:", error);
    throw error;
  }
};

// Function to fetch Organization Category
const getOrganizationCategory = async () => {
  try {
    const result = await sql.query`
      SELECT LookupValue, SetupLookupChildID, SetupLookupParentID 
      FROM dbo.[SetupLookupChild]
      WHERE SetupLookupParentID = (
        SELECT SetupLookupParentID 
        FROM dbo.[SetupLookupParent] 
        WHERE LookupName = 'Category'
      )
    `;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching Organization Category:", error);
    throw error;
  }
};

const insertOrganization = async (
  organizationUnitID,
  organizationTypeID,
  organizationNatureID,
  regionID,
  categoryID,
  specialtyID,
  parentOrganizationID,
  discountPercentage,
  displayName,
  phone1,
  phone2,
  fax,
  email,
  travelingTimeDays,
  travelingTimeHours,
  country,
  province,
  district,
  city,
  address,
  createdBy
) => {
  try {
    if (!organizationUnitID) {
      throw new Error("organizationUnitID is missing.");
    }

    if (!organizationTypeID) {
      throw new Error("organizationTypeID is missing.");
    }

    if (!organizationNatureID) {
      throw new Error("organizationNatureID is missing.");
    }

    if (!country) {
      throw new Error("country is missing.");
    }

    if (!province) {
      throw new Error("province is missing.");
    }

    if (!createdBy) {
      throw new Error("createdBy is missing.");
    }

    // Insert into the Organization table
    const result = await sql.query`
    INSERT INTO dbo.[Organization]
        (OrganizationUnitID, OrganizationTypeID, OrganizationNatureID, RegionID, CategoryID, SpecialtyID, ParentOrganizationID, DiscountPercentage, DisplayName, Phone1, Phone2, Fax, Email, TravelingTimeDays, TravelingTimeHours, Country, Province, District, City, Address, CreatedBy)
      OUTPUT INSERTED.*
      VALUES 
        (${organizationUnitID}, ${organizationTypeID}, ${organizationNatureID}, ${regionID}, ${categoryID}, ${specialtyID}, ${parentOrganizationID}, ${discountPercentage}, ${displayName}, ${phone1}, ${phone2}, ${fax}, ${email}, ${travelingTimeDays}, ${travelingTimeHours}, ${country}, ${province}, ${district}, ${city}, ${address}, ${createdBy});
  `;
    return result.recordset[0]; // Return the inserted organization data
  } catch (error) {
    console.error("Error inserting Organization:", error);
    throw error;
  }
};

module.exports = {
  getOrganizationTypes,
  getOrganizationNatures,
  getOrganizationSpeciality,
  getOrganizationRegions,
  getOrganizationCategory,
  insertOrganization,
};

const addEmployeeModel = require("../../../models/Employee/Add Employee/addEmployeeModal");

const createEmployee = async (req, res) => {
  const {
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
  } = req.body;

  try {
    const insertedEmployee = await addEmployeeModel.insertEmployee({
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
    });

    res.status(201).json(insertedEmployee);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).send("Controller: Error creating employee");
  }
};

module.exports = {
  //   getAllEmployees,
  createEmployee,
};

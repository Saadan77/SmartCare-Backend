const searchEmployeeModel = require("../../../models/Employee/Search Employee/searchEmployeeModel");

const searchEmployee = async (req, res) => {
  const {
    employeeNo,
    firstName,
    middleName,
    lastName,
    gender,
    cnic,
    dateOfBirth,
  } = req.query;

  try {
    const employees = await searchEmployeeModel.searchEmployee({
      employeeNo,
      firstName,
      middleName,
      lastName,
      gender,
      cnic,
      dateOfBirth,
    });

    if (employees.length === 0) {
      return res
        .status(404)
        .json({ message: "Controller: No employees found." });
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error in searchEmployeeController:", error);
    res.status(500).json({ message: "Failed to search for employees." });
  }
};

module.exports = {
  searchEmployee,
};

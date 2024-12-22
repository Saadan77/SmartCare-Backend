const updateEmployeeModel = require("../../../models/Employee/Update Employee/updateEmployeeModel");

const updateEmployee = async (req, res) => {
  const { employeeNo, username, password, status } = req.body;

  try {
    const updatedEmployee = await updateEmployeeModel.updateEmployee({
      employeeNo,
      username,
      password,
      status,
    });

    res.status(201).json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).send("Controller: Error updating employee");
  }
};

module.exports = {
  updateEmployee,
};

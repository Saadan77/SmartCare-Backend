const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./config/dbConfig");
const patientsRoutes = require("./routes/PatientsRoutes");
const addGroupRoutes = require("./routes/Service Setup/Add Group/addGroupRoutes");
const addSubGroupRoutes = require("./routes/Service Setup/Add SubGroup/addSubGroupRoutes");
const addServiceRoutes = require("./routes/Service Setup/Add Service/addServiceRoutes");
const addClientRoutes = require("./routes/Add Client/addClientRoutes");
const addHospitalRoutes = require("./routes/Organization/Add Hospital/addHospitalRoutes");
const addEmployeeRoutes = require("./routes/Employee/Add Employee/addEmployeeRoutes");
const searchEmployeeRoutes = require("./routes/Employee/Search Employee/searchEmployeeRoutes");
const updateEmployeeRoutes = require("./routes/Employee/Update Employee/updateEmployeeRoutes");
const ManageStandardOrganizationRoutes = require("./routes/Organization/Manage Standard Organization/manageStandardOrganizationRoutes");
const ManageOrganizationRoutes = require("./routes/Organization/Manage Organization/manageOrganizationRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api", patientsRoutes);
app.use("/api", addGroupRoutes);
app.use("/api", addSubGroupRoutes);
app.use("/api", addServiceRoutes);
app.use("/api", addClientRoutes);
app.use("/api", addHospitalRoutes);
app.use("/api", addEmployeeRoutes);
app.use("/api", searchEmployeeRoutes);
app.use("/api", updateEmployeeRoutes);
app.use("/api", ManageStandardOrganizationRoutes);
app.use("/api", ManageOrganizationRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectToDatabase();

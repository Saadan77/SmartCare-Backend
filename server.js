const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./config/dbConfig");
const { verifyToken, authorizeRoles } = require("./middlewares/authMiddleware"); // Import middleware

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
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

// Authentication Routes
app.use("/api/auth", authRoutes);

// Protected API Routes using middleware
app.use("/api", patientsRoutes);
app.use("/api/addGroup", verifyToken, authorizeRoles("admin"), addGroupRoutes);
app.use("/api/addSubGroup", verifyToken, authorizeRoles("admin"), addSubGroupRoutes);
app.use("/api/addService", verifyToken, authorizeRoles("admin"), addServiceRoutes);
app.use("/api", addClientRoutes);
app.use("/api/addHospital", verifyToken, authorizeRoles("admin"), addHospitalRoutes);
app.use("/api/addEmployee", verifyToken, authorizeRoles("admin", "hr"), addEmployeeRoutes);
app.use("/api/searchEmployee", verifyToken, authorizeRoles("admin", "hr", "manager"), searchEmployeeRoutes);
app.use("/api/updateEmployee", verifyToken, authorizeRoles("admin", "hr"), updateEmployeeRoutes);
app.use("/api/manageStandardOrg", verifyToken, authorizeRoles("admin"), ManageStandardOrganizationRoutes);
app.use("/api/manageOrganization", verifyToken, authorizeRoles("admin"), ManageOrganizationRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to Database
connectToDatabase();

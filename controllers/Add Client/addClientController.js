const addClientModel = require("../../models/Add Client/addClientModel");
const { sendEmail } = require("../../services/emailService");
const { sendSMS } = require("../../services/smsService");

const getAllClients = async (req, res) => {
  try {
    const clients = await addClientModel.getAllClients();
    console.log("Clients fetched:", clients); // Debugging log
    res.json(clients); // Make sure you are sending a proper response
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).send("Error fetching clients"); // Handle errors properly
  }
};

const creatClient = async (req, res) => {
  const {
    name,
    theme,
    adminUser,
    adminPassword,
    dbUser,
    dbPassword,
    createdBy,
  } = req.body;
  try {
    const insertedClient = await addClientModel.insertClient(
      name,
      theme,
      adminUser,
      adminPassword,
      dbUser,
      dbPassword,
      createdBy
    );

    // Send Email Notification to Admin
    await sendEmail(
      "saadanjawad50@gmail.com",
      "New Client Registered", // Email subject
      `A new client "${name}" has been successfully added by ${adminUser}.` // Email body
    );

    // Send SMS Notification to Admin
    await sendSMS(
      "+923213101228",
      `New Client Added: "${name}" by ${adminUser}.`
    );

    res.status(201).json(insertedClient);
  } catch (err) {
    console.error("Error creating client:", err);
    res.status(500).send("Error creating client");
  }
};

module.exports = {
  getAllClients,
  creatClient,
};

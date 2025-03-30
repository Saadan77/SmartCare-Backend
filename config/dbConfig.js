const sql = require("mssql");

const dbConfig = {
  user: "hmis",
  password: "hmis$1234",
  server: "localhost",
  port: 1433,
  database: "hmis",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function connectToDatabase() {
  try {
    await sql.connect(dbConfig);
    console.log("Connected to the SQL Server database");
  } catch (err) {
    console.error("Database connection failed", err);
  }
}

module.exports = {
  sql,
  connectToDatabase,
};

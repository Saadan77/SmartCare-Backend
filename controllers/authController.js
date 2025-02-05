const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sql } = require("../config/dbConfig");
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const result = await sql.query`SELECT * FROM Users WHERE username = ${username}`;
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.recordset[0];
    console.log("Username: ", user.username, "Password: ", user.password);

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, role: user.role });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };

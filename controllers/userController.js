const bcrypt = require("bcryptjs");
const { sql } = require("../config/dbConfig");

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await sql.query`
      INSERT INTO Users (username, password, role)
      VALUES (${username}, ${hashedPassword}, ${role})
    `;

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser };

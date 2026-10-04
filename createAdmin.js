require("dotenv").config();

const bcrypt = require("bcryptjs");
const pool = require("./src/config/database");

const createAdmin = async () => {
  try {
    const name = "Admin";
    const email = "admin@example.com";
    const password = "Admin@123";

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      console.log("Admin user already exists.");
      await pool.end();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)`,
      [name, email, hashedPassword, "admin"]
    );

    console.log("Admin user created successfully!");

    await pool.end();
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
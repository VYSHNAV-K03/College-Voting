const mongoose = require("mongoose");
const USER = require("../modelschemas/userschema");

const DB = process.env.DB;

mongoose
  .connect(DB)
  .then(async () => {
    console.log(`Connected successfully`);

    // Check if admin already exists
    const adminExists = await USER.findOne({ email: "admin1@gmail.com" });

    if (!adminExists) {
      // Create Admin User (password will be hashed automatically by the schema)
      const admin = new USER({
        name: "Admin",
        email: "admin1@gmail.com",
        phone: "1234567890",
        password: "1234", // Will be hashed by the schema hook
        cpassword: "1234", // Will be hashed by the schema hook
        Role: 2,
      });

      await admin.save();
      console.log("Admin user registered successfully");
    } else {
      console.log("Admin already exists");
    }
  })
  .catch((err) => console.log(`Not connected: ${err}`));

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Register new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      return res.status(201).json({ message: "Registered successfully" });
    }

    // User exists: validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Incorrect password. Try again." });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

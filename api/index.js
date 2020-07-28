const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middlewares/auth");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are required!" });
  }
  const userobj = await User.findOne({ email, password });
  if (!userobj) {
    // invalid auth
    return res.status(400).json({ msg: "Invalid email or Password" });
  }
  const token = await jwt.sign({ email }, process.env.PASS_SALT);
  userobj.token = token;
  userobj.save();
  res.json({ email, role: userobj.role, token });
});

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    res.status(400).json({ msg: "All fields are required!" });
  }
  const userobj = await User.findOne({ email });
  if (userobj) {
    return res.status(400).json({ msg: "User with the email already exists!" });
  }
  const newUser = new User({ email, password, role });

  newUser.permissions.push("AccessGreenButton");
  if (role == "admin") {
    newUser.permissions.push("AccessRedButton");
  }

  const token = await jwt.sign({ email }, process.env.PASS_SALT);
  newUser.token = token;
  newUser.save();
  res.json({ email, role, token });
});

router.get("/auth", auth, (req, res) => {
  const { email, token, role, permissions } = req.user;
  res.json({ email, token, role, permissions });
});

module.exports = router;

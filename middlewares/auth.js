const User = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(400).json({ msg: "No token provided in header" });
  }
  const userobj = await User.findOne({ token });
  if (!userobj) {
    return res.status(400).json({ msg: "Invalid Token" });
  }
  req.user = userobj;
  next();
};

module.exports = auth;

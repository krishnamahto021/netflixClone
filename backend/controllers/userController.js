const User = require("../models/userSchema");
const crypto = require("crypto");

module.exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const { _id, name, email, token } = user;
    res.status(200).json({
      _id,
      name,
      email,
      token,
    });
  } else {
    const newUser = await User.create({
      name,
      email,
      password,
      token: crypto.randomBytes(16).toString("hex"),
    });
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      token: newUser.token,
    });
  }
};

const User = require("../models/userSchema");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const { _id, name, email, token } = user;
    res.status(200).json({
      message: "User already Exists",
    });
  } else {
    const newUser = await User.create({
      name,
      email,
      password,
      token: crypto.randomBytes(16).toString("hex"),
    });
    res.status(201).json({
      message: "New user created",
    });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json({
          message: "Sign In successfull",
          data: {
            _id: user._id,
            email: user.email,
            jwtToken: jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {
              expiresIn: "30d",
            }),
          },
        });
      } else {
        return res.status(201).json({
          message: "Password Invalid",
        });
      }
    } else {
      res.status(202).json({
        message: "User doesnot exists",
      });
    }
  } catch (error) {
    console.log(`error in the signinup the user ${error}`);
    res.status(400).json({
      message: "Internal server Error",
    });
  }
};

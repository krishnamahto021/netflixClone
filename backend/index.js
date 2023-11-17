const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");

const app = express();

app.use(express.json());

connectDB();

app.use(passport.initialize());

app.use("/", require("./routes"));

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server is running on the PORT ${PORT}`)
);

const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const passport = require("passport");
const path = require("path");
const passportJWT = require("./config/passport-jwt-strategy");

const app = express();

app.use(express.json());

connectDB();

app.use(passport.initialize());

app.use("/", require("./routes"));

/*---------------------DEPLOYMENT-----------------------*/
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
}else{
  app.get("/",(req,res)=>{
    res.send("Running on development")
  })
}

/*---------------------DEPLOYMENT-----------------------*/

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server is running on the PORT ${PORT}`)
);

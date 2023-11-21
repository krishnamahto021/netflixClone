const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = mongoose.Schema(
  {
    email: { type: String, required: true, uinque: true },
    password: { type: String, required: true },
    token: { type: String },
    isVerified: { type: Boolean, default: true },
    likedMovies: { type: Array },
    disLikedMovies: { type: Array },
    favoriteMovies: { type: Array },
  },
  { timestamps: true }
);

// pre-save middleware to hash the password
userModel.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const User = mongoose.model("Users", userModel);
module.exports = User;

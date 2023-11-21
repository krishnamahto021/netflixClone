const User = require("../models/userSchema");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const { _id, email, token } = user;
    res.status(200).json({
      message: "User already Exists",
    });
  } else {
    const newUser = await User.create({
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

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      // Check if the movie with the given id already exists in the likedMovies array
      const isMovieAlreadyLiked = user.likedMovies.some(
        (movie) => movie.id === data.id
      );

      if (isMovieAlreadyLiked) {
        return res.status(200).json({
          message: "Movie already exists in likedMovies",
        });
      }

      user.likedMovies = [data, ...user.likedMovies];
      await user.save();

      res.status(201).json({
        message: "Movie added to likedMovies successfully",
        data: data,
      });
    } else {
      res.status(202).json({
        message: "Email not registered!!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.addToDislikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      // Check if the movie with the given id already exists in the likedMovies array
      const isMovieAlreadyDisliked = user.disLikedMovies.some(
        (movie) => movie.id === data.id
      );

      if (isMovieAlreadyDisliked) {
        return res.status(200).json({
          message: "Movie already Disliked",
        });
      }

      user.disLikedMovies = [data, ...user.disLikedMovies];
      await user.save();

      res.status(201).json({
        message: "Disliked the movie",
        data: data,
      });
    } else {
      res.status(202).json({
        message: "Email not registered!!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.addToFavoriteMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      // Check if the movie with the given id already exists in the likedMovies array
      const isMovieAlreadyLiked = user.favoriteMovies.some(
        (movie) => movie.id === data.id
      );

      if (isMovieAlreadyLiked) {
        return res.status(200).json({
          message: "Movie already exists in Favorite Movies",
        });
      }

      user.favoriteMovies = [data, ...user.favoriteMovies];
      await user.save();

      res.status(201).json({
        message: "Movie added to Favorite LIst successfully",
        data: data,
      });
    } else {
      res.status(202).json({
        message: "Email not registered!!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.fetchAll = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({
        message: "Fetched all",
        likedMovies: user.likedMovies,
        favoriteMovies: user.favoriteMovies,
        disLikedMovies: user.disLikedMovies,
      });
    }else{
      return res.status(201).json({
        message:"User not found"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "internal server error",
    });
  }
};

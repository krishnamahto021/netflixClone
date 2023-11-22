const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);

router.post(
  "/movies/addToLikedMovies",
  passport.authenticate("jwt", {
    failureRedirect: "/",
    session: false,
  }),
  userController.addToLikedMovies
);
router.post(
  "/movies/addToDisLikedMovies",
  passport.authenticate("jwt", {
    failureRedirect: "/",
    session: false,
  }),
  userController.addToDislikedMovies
);
router.post("/movies/addToFavoriteMovies", userController.addToFavoriteMovies);

router.post("/fetchAll", userController.fetchAll);

module.exports = router;

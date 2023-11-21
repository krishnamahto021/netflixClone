const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);

router.post("/movies/addToLikedMovies", userController.addToLikedMovies);
router.post("/movies/addToDisLikedMovies", userController.addToDislikedMovies);
router.post("/movies/addToFavoriteMovies", userController.addToFavoriteMovies);

router.post("/fetchAll", userController.fetchAll);

module.exports = router;

const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// Create new movie route
router.get("/create", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("movies/new-movie", { allCelebrities });
  } catch (error) {
    console.log("There has been an error: ", error);
    next(error); // Pass the error to the error handling middleware
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.redirect(`/movies/${newMovie._id}`);
  } catch (error) {
    console.log("There has been an error: ", error);
    next(error); // Pass the error to the error handling middleware
  }
});

// Movies route
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.render("movies/movies", { allMovies });
  } catch (error) {
    console.log("There has been an error: ", error);
    next(error); // Pass the error to the error handling middleware
  }
});

router.get("/:movieId", async (req, res, next) => {
  const movieId = req.params.movieId;
  try {
    const movie = await Movie.findById(movieId);
    res.render("movies/movie-details", { movie });
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

router.get("/:movieId", async (req, res, next) => {
  const movieId = req.params.movieId;
  try {
    const movie = await Movie.findById(movieId);
    res.render("movies/movie-details", { movie });
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

module.exports = router;

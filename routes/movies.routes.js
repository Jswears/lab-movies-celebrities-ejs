const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// Create new movie route
router.get("/create", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("movies/new-movie", { allCelebrities });
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.redirect(`/`);
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

// Movies route
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.render("movies/movies", { allMovies });
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id).populate("cast");
    const castOfMovie = movie.cast;
    res.render("movies/movie-details", { movie, castOfMovie });
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.redirect("/movies");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const movieToEdit = await Movie.findById(id);
  const celebrityToEdit = await Celebrity.find();

  try {
    res.render("movies/edit-movie", { movieToEdit, celebrityToEdit });
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  console.log(req.body);

  try {
    await Movie.findByIdAndUpdate(id, {
      title: title,
      genre: genre,
      plot: plot,
      cast: cast,
    });
    res.redirect(`/movies/${id}`);
  } catch (error) {
    console.log("Error");
  }
});
module.exports = router;

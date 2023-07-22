const { application } = require("express");
const CelebrityModel = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

//Create new celebrity route
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

//Create POST
router.post("/create", async (req, res, next) => {
  //GET the data
  const { name, occupation, catchPhrase } = req.body;
  try {
    const newCelebrity = await Celebrity.create({
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase,
    });
    res.redirect(`/`);
  } catch (error) {
    res.render("celebrities/new-celebrity", { errorMessage: "Try again!" });
  }
});

//Celebrities route
router.get("/", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { allCelebrities });
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrity = await Celebrity.findById(id);
    res.render("celebrities/oneCelebrity", { celebrity });
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Celebrity.findByIdAndDelete(id);
    res.redirect("/celebrities");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const celebrityToEdit = await Celebrity.findById(id);
  try {
    res.render("celebrities/edit-celebrity", { celebrityToEdit });
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  try {
    await Celebrity.findByIdAndUpdate(id, {
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase,
    });
    res.redirect(`/celebrities/${id}`);
  } catch (error) {
    console.log("Error");
  }
});

module.exports = router;

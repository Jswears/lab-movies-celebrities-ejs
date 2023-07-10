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
  const { body } = req;
  try {
    const newCelebrity = await Celebrity.create(body);
    res.redirect(`/celebrities/`);
  } catch (error) {
    res.render("celebrities/new-celebrity");
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

module.exports = router;

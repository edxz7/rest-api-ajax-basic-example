const router = require("express").Router();
const { 
  getAllCountries,
  updateCountry,
  deleteCountry,
  createCountry,
  getOneCountry
} = require('../controllers');

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router
  .get("/countries", getAllCountries)
  .get("/countries/:countryId", getOneCountry)
  .post("/countries", createCountry)
  .patch("/countries/:countryId", updateCountry)
  .delete("/countries/:countryId", deleteCountry);

module.exports = router;

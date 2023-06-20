const Country = require('../models/Country.model');

const getAllCountries = (req, res) => {
  console.log("get all countries")
  Country.find()
  .then(countries => res.status(200).json({ countries }))
  .catch(err => console.error(err));
}

const getOneCountry = (req, res) => {
  const { countryId } = req.params;
  Country.findById(countryId).then(country =>
    res.status(200).json(country)
  );
}


const createCountry = async (req, res) => {
  console.log("Create")
  const { name, confirmed, recovered, deaths } = req.body;
  console.log(name, confirmed, recovered, deaths)
  Country.create({ name, confirmed, recovered, deaths })
    .then(() => res.status(201).json({ message: "Country created" }))
    .catch(err => console.error(err));
}


const updateCountry = async (req, res) => {
  const { countryId } = req.params;
  const { name, confirmed, recovered, deaths } = req.body;
  console.log(name, confirmed, recovered, deaths);
  await Country.findByIdAndUpdate(countryId, { name, confirmed, recovered, deaths })
  res.status(200).json({ message: "Yastubo" });
}


const deleteCountry = (req, res) => {
  const { countryId } = req.params;
  Country.findByIdAndDelete(countryId)
    .then(() => res.status(200).json({ message: "Target eliminated" }))
    .catch(err => console.error(err));
}

module.exports = {
    getAllCountries,
    getOneCountry,
    createCountry,
    updateCountry,
    deleteCountry
}
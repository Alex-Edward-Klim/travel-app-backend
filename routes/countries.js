const express = require('express');
const router = express.Router();
const _ = require('lodash');

const Country = require('../models/country');

router.get('/', async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getCountry, (req, res) => {
  res.json(res.country);
});

router.post('/', async (req, res) => {
  const country = new Country({
    ...req.body
  });
  try {
    const newCountry = await country.save();
    res.status(201).json(newCountry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const arr = await Country.find({
        "localizations.EN.name": req.params.id
      });
    const country = arr[0];
    if (country == null) {
      return res.status(404).json({ message: "Country isn't found!" });
    } else {

      const countryCopy = JSON.parse(JSON.stringify(country));
      _.merge(countryCopy, req.body);

      for (let k in countryCopy) {
        country[k] = countryCopy[k];
      }

      res.json(await country.save());
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

async function getCountry(req, res, next) {
  let country;
  try {
    country = await Country.findById(req.params.id);
    if (country == null) {
      return res.status(404).json({ message: "Country isn't found!" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.country = country;
  next();
}

module.exports = router;

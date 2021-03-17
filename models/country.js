const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageURL: String,
  numName: Number,
  rating: {
    total: Number,
    users: Object
  }
});

const countrySchema = new mongoose.Schema({
  firstImageUrl: {
    type: String,
  },
  secondImageUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  currency: {
    type: String,
  },
  timeZone: {
    type: String,
  },

  localizations: {
    EN: {
      capital: String,
      description: String,
      name: String,
      places: [subSchema]
    },
    RU: {
      capital: String,
      description: String,
      name: String,
      places: [subSchema]
    },
    BE: {
      capital: String,
      description: String,
      name: String,
      places: [subSchema]
    }
  },

  rating: {
    total: Number,
    users: Object
  }
}, { strict: false });

module.exports = mongoose.model('country', countrySchema);

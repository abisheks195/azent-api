require('dotenv').config();
const mongoose = require('mongoose');
const mongoosastic = require("mongoosastic");

// elasticsearch config
const esclient = require('../config/esconfig');

// Uni Model or Schema
const UniSchema = mongoose.Schema({
  alpha_two_code: {type: String, required: true, maxlength: 5},
  country: {type: String, required: true, maxlength: 100},
  domain: {type: String, required: true, maxlength: 100},
  name: {type: String, required: true, maxlength: 100},
  web_page: {type: String, required: true, maxlength: 100},
});

// plugin to connect elasticsearch and mongodb
UniSchema.plugin(mongoosastic, {
  esClient: esclient,
  index: "azent"
});

module.exports = mongoose.model('Uni', UniSchema);



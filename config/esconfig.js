const elasticsearch = require('elasticsearch');

// Connect to elasticsearch 
const esclient = new elasticsearch.Client({
  host: process.env.ESHOST,
  httpAuth: process.env.ESHTTPAUTH
});

module.exports = esclient;
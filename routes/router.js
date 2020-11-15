require('dotenv').config();
const express = require('express');
const router = express.Router();
const Uni = require('../models/uni');

// Elasticsearch config
const esclient = require('../config/esconfig');

// POST route for register
router.post('/add', (req, res, next) => {
  let newUni = new Uni({
    alpha_two_code: req.body.alpha_two_code,
    country: req.body.country,
    domain: req.body.domain,
    name: req.body.name,
    web_page: req.body.web_page
  });

  newUni.save((err, uni) => {
    if(err){
      res.json({success: false, msg: 'Failed to register', err: err});
      console.log(err);
    } else {
      res.json({success: true, msg: 'Registered successfully'});
      newUni.on('es-indexed', (err, res) => {
        if(err) throw err;
      });
    }
  });
});

// GET the entire data from mongodb and elasticsearch
router.get('/all', (req, res, next) => {

  Uni.find({}, (err, docs) => {
    if(err) {
      res.json({success: false, msg: "Error in finding all the items."});
      console.log(err);
    } else {
      res.json(docs);
    }
  });
});

// POST request to delete the item from mongodb and elasticsearch
router.post('/:id/delete', (req, res, next) => {
  Uni.findByIdAndDelete(req.body._id, (err, doc) => {
    if(err) {
      res.json({success: false, msg: "Could not delete", err: err});
      console.log(err);
    } else {
      esclient.delete({
        index: 'azent',
        type: '_doc',
        id: req.body._id
      }, (err) => {
        if(err) {
          console.log(err);
        }
      });
      res.json(doc);
    }
  });
});

// POST request to search a fuzzy match through elasticsearch
router.post('/search', (req,res, next) => {
  esclient.search({
    index: 'azent',
    body: {
      query: {
        fuzzy: {
          name: {
            value: req.body.searchName + '*',
            fuzziness: "AUTO"
          } 
        }
      }
    }
  }, (err, docs) => {
    if(err) {
      console.log(err);
    }
    // console.log(docs.hits.hits);
    res.json(docs.hits.hits);
  });
})

// POST request to update the item from mongodb and elasticsearch
router.post('/:id/update', (req, res, next) => {
  const item = {
    alpha_two_code: req.body.alpha_two_code,
    country: req.body.country,
    domain: req.body.domain,
    name: req.body.name,
    web_page: req.body.web_page
  }

  Uni.updateOne({_id: req.body._id}, item, (err, doc) => {
    if(err) {
      console.log(err);
    } else {
      res.json({success: true, msg: "Updated Successfully!", doc: doc});
      esclient.update({
        index: 'azent',
        type: '_doc',
        id: req.body._id,
        body: {
          doc: item
        }
      }, (err, res) => {
        if(err) {
          console.log(err);
        }
      });
    }
  })
  console.log(req.body)
});

module.exports = router;


var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/dummy_models', function(req, res, next) {
    queries.getAll()
        .then(function(dummy_models) {
            res.status(200).json(dummy_models);
        })
        .catch(function(error) {
            next(error);
        });
});



module.exports = router;

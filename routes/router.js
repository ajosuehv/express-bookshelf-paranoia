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

router.get('/dummy_models/:id', function(req, res, next) {
    queries.getSingle(req.params.id)
        .then(function(dummy_models) {
            res.status(200).json(dummy_models);
        })
        .catch(function(error) {
            next(error);
        });
});

router.post('/dummy_models', function(req, res, next) {
    queries.add(req.body)
        .then(function(dummyModelId) {
            return queries.getSingle(dummyModelId);
        })
        .then(function(dummy_model) {
            res.status(200).json(dummy_model);
        })
        .catch(function(error) {
            next(error);
        });
});

router.put('/dummy_models/:id', function(req, res, next) {
    if(req.body.hasOwnProperty('id')) {
        return res.status(422).json({
            error: 'Unable to update with this parameters'
        });
    }
    queries.update(req.params.id, req.body)
        .then(function() {
            return queries.getSingle(req.params.id);
        })
        .then(function(dummy_model) {
            res.status(200).json(dummy_model);
        })
        .catch(function(error) {
            next(error);
        });
});

router.delete('/dummy_models/:id', function(req, res, next) {
    queries.getSingle(req.params.id)
        .then(function(dummy_model) {
            queries.deleteItem(req.params.id)
                .then(function() {
                    res.status(200).json(dummy_model);
                })
                .catch(function(error) {
                    next(error);
                });
        }).catch(function(error) {
        next(error);
    });
});

module.exports = router;

var knex = require('./knex.js');

function DummyModels() {
    return knex('dummy_model');
}

// *** queries *** //

function getAll() {
    return DummyModels().select();
}


module.exports = {
    getAll: getAll
};
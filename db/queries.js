var knex = require('./knex');
var dummy_model = require('../models/DummyModel');
function DummyModels() {
    return knex('dummy_model');
}

// *** queries *** //

function getAll() {
    return DummyModels().select();
}

function getSingle(dummyModelId) {
    return DummyModels().where('id', parseInt(dummyModelId)).first();
}

function add(dummy_model) {
    return DummyModels().insert(dummy_model, 'id');
}

function update(dummyModelId, updates) {
    return DummyModels().where('id', parseInt(dummyModelId)).update(updates);
}

function deleteItem(dummyModelId) {
    return DummyModels().where('id', parseInt(dummyModelId)).del();
}

module.exports = {
    getAll: getAll,
    getSingle: getSingle,
    add: add,
    update: update,
    deleteItem: deleteItem
};
var bookshelf = require('../bookshelf');

bookshelf.plugin(require('bookshelf-paranoia'));
bookshelf.plugin('registry');

var dummy_model = bookshelf.Model.extend({
    tableName: 'dummy_model',
    softDelete: true,
    hasTimestamps: true
});
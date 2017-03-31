var knex = require('./db/knex');
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin(require('bookshelf-paranoia'));
bookshelf.plugin('registry');
module.exports =  bookshelf;
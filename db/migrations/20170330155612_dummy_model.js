
exports.up = function(knex, Promise) {
    return knex.schema.createTable('dummy_model', function(table){
        table.increments();
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('genre').notNullable();
        table.string('email').notNullable().unique();
        table.boolean('active').notNullable();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('dummy_model');
};

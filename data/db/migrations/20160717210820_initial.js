'use strict';

exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('games', function (table) {
        table.increments('id').primary();
        table.datetime('created_at');
        table.datetime('modified_at');
        table.string('uuid');
        table.text('game_data');
        table.boolean('game_ended');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTable('games');
};

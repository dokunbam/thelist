
const knex = require('knex')(options);
const author = require('../model/connection');



author.schema.createTable('author', (table) => {
    table.increments('id');
    table.string('username').unique().notNullable();;
    table.string('email').unique().notNullable();
    table.string('first_name').notNullable();
    table.string('surname').notNullable();
    table.string('url').notNullable();
    table.timestamp('date_of_birth').defaultTo(knex.fn.now());
}).then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });
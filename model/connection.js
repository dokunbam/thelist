const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'recipe'
    }
});

/*
knex.schema.createTable('author', (table) => {
    table.increments('id');
    table.string('username').unique().notNullable();;
    table.string('email').unique().notNullable();
    table.string('first_name').notNullable();
    table.string('surname').notNullable();
    table.string('url').notNullable();
    table.timestamp('date_of_birth').defaultTo(knex.fn.now());
})

knex.schema.createTable('book', (table) => {
    table.increments('id');
    table.integer('author').references('id').inTable('author');
    table.string('summary').notNullable();
    table.string('isbn').notNullable();
    table.string('category').notNullable();
    table.string('url').notNullable();
}).then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });
    */

module.exports = knex;
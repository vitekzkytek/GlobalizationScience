const { Pool, Client } = require('pg');
const connectionString = 'postgresql://root:IDEA_science2018@science-internationality-dbinstance.c3aa5fkeiz2h.us-east-2.rds.amazonaws.com:5432/scienceInternationalitydb';

const pool = new Pool({
    connectionString: connectionString,
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};

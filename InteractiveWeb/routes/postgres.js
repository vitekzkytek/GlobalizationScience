const { Pool, Client } = require('pg');
const connectionString = process.env.DB_CONNSTRING;

const pool = new Pool({
    connectionString: connectionString,
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};

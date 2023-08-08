const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'secretpassword',
  host: 'postgres',
  port: 5432,
  database: 'properties'
});

module.exports = pool;

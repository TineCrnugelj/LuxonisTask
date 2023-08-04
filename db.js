const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '123123',
  host: 'localhost',
  port: 5432,
  database: 'properties'
});

module.exports = pool;

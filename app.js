const express = require('express')
const app = express();
const cors = require('cors');
const port = 5000;
const pool = require('./db');

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/properties', async (req, res) => {
  const page = req.query.page;
  const items_per_page = 8;

  if (page) {
    const startIndex = page * items_per_page;
    const properties = await pool.query(
      `SELECT * FROM property OFFSET ${startIndex} LIMIT ${items_per_page}`
    );

    return res.json(properties.rows).status(200);
  }

  const properties = await pool.query(
    `SELECT * FROM property LIMIT ${items_per_page}`
  );

  return res.json(properties.rows).status(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
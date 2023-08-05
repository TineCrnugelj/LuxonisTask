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
  const properties = await pool.query(
    'SELECT * FROM property'
  );

  return res.json(properties.rows).status(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
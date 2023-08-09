const express = require('express');
const {Sequelize} = require('sequelize');
const cors = require('cors');
const config = require('../config')['development'];
const port = 5000;

const app = express();
const Property = require('./models/Property');

app.use(cors());

async function connectToPostgres() {
  const sequelize = new Sequelize(config.postgres.options);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

config.postgres.client = connectToPostgres();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/api/properties', async (req, res) => {
  const page = req.query.page;
  const items_per_page = 8;

  if (page > 0) {
    const startIndex = (page - 1) * items_per_page;
    const properties = await Property.findAll({offset: startIndex, limit: items_per_page})

    return res.json(properties).status(200);
  }
  const properties = await Property.findAll({limit: items_per_page});

  return res.json(properties).status(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
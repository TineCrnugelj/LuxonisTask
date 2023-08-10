const express = require('express');
const {Sequelize} = require('sequelize');
const cors = require('cors');
const config = require('../config')['development'];
const port = 5000;

const app = express();
const Property = require('./models/Property');

app.use(cors());

/**
 * This is returning Promise<void>, then in line 25
 * you're setting config.postgres.client to Promise<void>
 * is this some kind of library configuration ?
 */
async function connectToPostgres() {
  const sequelize = new Sequelize(config.postgres.options);
  try {
    await sequelize.authenticate();
    /**
     * For real world apps I would always use more advanced logging, check
     * what is available for NodeJS (Winston, Npmlog etc.)
     */
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

config.postgres.client = connectToPostgres();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

/**
 * It is good practice to keep your controller declarations clear
 * for example here you are checking for req.query.page then setting default
 * items_per_page and checking for conditions etc. In bigger projects always
 * try to make that logic reusable, by creating some sort of functions that manage
 * that for you, look at 'extractPaginationInfo' function. Now bottom code can be simplified, and
 * 'extractPaginationInfo' function can be used in multiple places.
 *
 * Simplified version of this endpoint would look like this
 * app.get('/api/properties', async (req, res) => {
 *   const page = req.query.page;
 *   const { offset, limit } = extractPaginationInfo(req)
 *
 *   const properties = await Property.findAll({limit, offset});
 *   return res.json(properties).status(200);
 * });
 */
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


const extractPaginationInfo = (req, itemsPerPage = 8) => {
  let page;
  try {
    page = parseInt(req.query.page ?? -1)
  }catch (e) {
    console.error(`Failed to cast string: ${req.qurey.page} to int, defaulting to -1`)
    page = -1
  }

  return {
    offset: page > 0 ? (page -1) * itemsPerPage : 0,
    limit: itemsPerPage
  }

}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

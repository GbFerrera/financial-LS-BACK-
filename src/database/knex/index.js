const config = require("../../../knexfile")
const knex = require("knex")

// Determine which environment to use based on NODE_ENV
const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const connection = knex(config[environment])

module.exports = connection
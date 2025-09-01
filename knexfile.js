const path = require("path");
require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: "postgres://postgres:t4GXtCaGiRKMXX5Po9rGfizw3cEBfJ8UNeixqw5OXJ4krW2eNFKJ7S36oLLvSsoo@62.72.11.161:5438/postgres"
          ,
        pool: {
          min: 2,
          max: 10,
          acquireTimeoutMillis: 30000,
          createTimeoutMillis: 30000,
          idleTimeoutMillis: 10000,
          createRetryIntervalMillis: 200
        },
        migrations: {
          directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
        },
        seeds: {
          directory: path.resolve(__dirname, "src", "database", "knex", "seeds")
        }
      },
  
  production: {

    client: 'pg',
    connection: ""
      ,
    pool: {
      min: 2,
      max: 10,
      acquireTimeoutMillis: 30000,
      createTimeoutMillis: 30000,
      idleTimeoutMillis: 10000,
      createRetryIntervalMillis: 200
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "knex", "seeds")
    }
   
  }
};
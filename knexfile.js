const path = require("path");
require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: "postgresql://postgres:FXRmFBeUFwmlQfzHBSBMhIRSCDVuJvLU@mainline.proxy.rlwy.net:32864/railway"
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
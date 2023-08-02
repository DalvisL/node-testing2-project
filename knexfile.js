// Update with your config settings.
const common = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
  pool: {
    afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done)
  },
}


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    ...common,
    connection: {
      filename: './database/pokemon.db3',
    }
  },
  testing: {
    ...common,
    connection: {
      filename: './database/test.db3',
    }
  },
  

};

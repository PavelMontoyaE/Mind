// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'p4ssw0rd',
      database: process.env.DATABASE || 'db', // DATABASE = devblog
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

module.exports = {
  language: 'pt-BR',
  session: {
    secret: process.env.SESSION_SECRET,
  },
  cron: {
    db: {
      address: process.env.MONGO_URL,
    },
  },
  database: {
    client: 'mssql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      options: {
        encrypt: false,
      },
    },
    migrations: {
      directory: './database/migrations',
    },
  },
  mongo: {
    url: process.env.MONGO_URL,
  },
};

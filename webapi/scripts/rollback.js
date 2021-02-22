const knex = require('../src/Models');

knex.migrate.rollback()
  .then(() => {
    process.stdout.write('Database Rollback');
  })
  .catch((err) => {
    process.stdout.write(err.message);
  })
  .finally(() => knex.destroy());

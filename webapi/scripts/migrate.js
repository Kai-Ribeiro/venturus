const knex = require('../src/Models');

knex.migrate.latest()
  .then(([batch, migrations]) => {
    process.stdout.write(`Database Migrated. Batch ${batch}\n`);
    migrations.forEach((migration) => process.stdout.write(`${migration}\n`));
  })
  .catch((err) => process.stderr.write(err.message))
  .finally(() => knex.destroy());

const Knex = require('knex');
const Config = require('../Services/Config');

module.exports = Knex(Config.get('database'));

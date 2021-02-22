const { get } = require('lodash');
const config = require('../../config');

module.exports = class Config {
  static get(key) {
    return get(config, key);
  }
};

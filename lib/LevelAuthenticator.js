const level = require('level');
const thenLevelUp = require('then-levelup');
const bcrypt = require('bcrypt');

const ITERATIONS = 12;

class LevelAuthenticator {
  constructor ({ path }) {
    this._db = thenLevelUp(level(path));
  }

  /**
   * Check if password match.
   * @param {string} login - user login
   * @param {string} password - password to compare
   * @returns {Promise<boolean>} -a promise that...
   */
  validate(login, password) {
    return this._db.get(login).then(function(passwordHash) {
      return bcrypt.compare(password, passwordHash)
        .then(function (passwordsMatch) {
          return passwordsMatch;
        });
    }, function(error) {
      // TODO: distinguish "key doesn't exists" from other errors
      return false;
    });
  }

  register(login, password) {
    const db = this._db;
    return bcrypt.hash(password, ITERATIONS).then(function(passwordHash) {
      // transformer function
      return db.put(login, passwordHash);
    });
  }
}

module.exports = LevelAuthenticator;
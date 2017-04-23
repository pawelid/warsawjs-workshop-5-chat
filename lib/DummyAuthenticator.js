class DummyAuthenticator {
  constructor (users) {
    /**
     * A map of login => password (plaintext)
     * @type {Map.<string, string>}
     */
    this._userPasswords = new Map();
    Object.keys(users).forEach(function(login) {
      this._userPasswords.set(login, users[login]);
    }, this);
  }

  /**
   * Check if password match.
   * @param {string} login - user login
   * @param {string} password - password to compare
   * @returns {Promise<boolean>} -a promise that...
   */
  validate(login, password) {
    if(this._userPasswords.has(login) && this._userPasswords.get(login) === password) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }
}

module.exports = DummyAuthenticator;
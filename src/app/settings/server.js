angular
  .module('app')
  /**
   * @ngdoc property
   * @name app.property:API
   * @returns {object} An object with the following fields:
   * - API version
   * - Port number
   * - Protocol used (HTTP or HTTPS)
   * - Host name or IP address
   * - Prefixes
   * - URL form by the previous fields
   *
   * @description
   * Information about the API.
   *
   * **Note:** -
   */
  .constant('API', {
    /**
     * The environment to be used. Options: testing|distribution
     * @type {String}
     */
    _environment: 'newQa',

    /**
     * Testing and distribution configuration
     * NOTE: DO NOT TOUCH THIS IN RUNNING TIME
     * @type {Object}
     */
    qa: {
      version: '',
      port: '8080',
      protocol: 'http',
      host: '186.3.131.60',
      prefix: 'api'
    },
    newQa: {
      version: '',
      port: '',
      protocol: 'http',
      host: 'api.dev.dawere.com',
      prefix: ''
    },
    production: {
      version: '',
      port: '',
      protocol: 'https',
      host: 'api.dawere.com',
      prefix: ''
    },

    /**
     * Returns the URL given an environment
     * @return {String}
     */
    get url() {
      let api = this[this._environment] ? this[this._environment] : this.testing;

      return api.protocol + '://' + api.host + (api.port ? ':' + api.port : '') + '/' + api.prefix + (api.prefix ? '/' : '') + api.version + (api.version ? '/' : '');
    }
  });

angular
  .module('app')
  /**
   * @ngdoc property
   * @name app.property:APP_INFO
   * @returns {object} An object with the following fields:
   * - version of release
   * - date of release
   */
  .constant('APP_INFO', {
    name: 'MetalGiga',
    version: 'v0.1',
    day: 21,
    month: 10,
    year: 2018,
    // NOTE: do not touch this
    get date() {
      return new Date(this.year, this.month - 1, this.day);
    }
  })
  .constant('MERCADO_PAGO_API_KEY', 'TEST-91cf50c6-bc90-4fbf-8003-b914c164d729')
  .constant('STRIPE_TEST_KEY', 'pk_test_MY89ghcydO4HKeeZzYBDfzD7')
  .constant('STRIPE_KEY', 'pk_live_ZVZngyTsVDFPE9bn9NAbYo5f')
  .constant('FACEBOOK_APP_ID', '828249960656381')
  /**
   * Min date
   */
  .constant('MIN_DATE', () => {
    let date = new Date();
    date.setDate(1);
    date.setMonth(0);
    date.setYear(1971);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  });

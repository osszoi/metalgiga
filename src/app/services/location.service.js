(() => {
  class LocationService {
    constructor($timeout) {
      this.$timeout = $timeout;

      this.now = undefined;
    }

    init() {
      if (_.isUndefined(this.now)) {
        $.getJSON('https://ipapi.co/json/', (data) => {
          this.now = data;
          console.log('Currently at:', this.now);

          // USA
          //this.now.country = 'US';
        });
      }
    }

    isVenezuela() {
      return _.isUndefined(this.now) ? false : this.now.country === 'VE';
    }
  }

  angular.module('app').service('LocationService', LocationService);
})();

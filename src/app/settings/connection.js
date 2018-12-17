angular.module('app').run(($rootScope, OnlineService, Auth) => {
  // Checking internet connection
  //OnlineService.init();

  $rootScope.$on('online', (event, data) => {
    console.log('It\'s online now.');
    // If connection change, we need to logout to refresh token and credentials
  });

  $rootScope.$on('offline', (event, data) => {
    console.log('It\'s offile now.');
    // If connection change, we need to logout to refresh token and credentials
  });
});

(() => {
  class OnlineService {
    constructor(RESTful, $interval, $rootScope) {
      this.RESTful = RESTful;
      this.$interval = $interval;
      this.$rootScope = $rootScope;
    }

    init() {
      const TIME_INTERVAL = 1000 * 10; // 10seg

      // First ping
      this.ping();

      // Interval check
      this.$interval(() => {
        this.ping();
      }, TIME_INTERVAL);
    }

    ping() {
      this.RESTful.get('version').then(
        (response) => {
          // Emit signal of change
          if (this._isOnline === false) {
            // Before: offline
            this.$rootScope.$broadcast('online', !this._isOnline);
          }
          // Change
          this._isOnline = true;
        },
        (response) => {
          // Emit signal of chenge
          if (this._isOnline === true) {
            // Before: online
            this.$rootScope.$broadcast('offline', !this._isOnline);
          }
          // Change
          this._isOnline = false;
        }
      );
    }

    set isOnline(value) {
      this._isOnline = value;
    }
    get isOnline() {
      return this.DEBUG ? false : this._isOnline;
    }
  }

  angular.module('app').service('OnlineService', OnlineService);
})();

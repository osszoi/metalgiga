(() => {
  class BroadcastService {
    constructor($rootScope, $timeout) {
      this.$rootScope = $rootScope;
      this.$timeout = $timeout;
    }

    cast(event, param, timeout = 0) {
      this.setParam(param);

      this.$timeout(() => {
        this.$rootScope.$broadcast(event);
      }, timeout);
    }

    catch(event, fn) {
      return this.$rootScope.$on(event, fn);
    }

    setParam(param) {
      this.param = angular.copy(param);
    }

    getParam() {
      // let _param = angular.copy(this.param);
      // this.param = undefined;
      return this.param;
    }
  }

  angular.module('app').service('BroadcastService', BroadcastService);
})();

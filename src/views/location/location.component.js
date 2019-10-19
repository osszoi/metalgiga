(() => {
  class LocationController {
    constructor() {
    }

    $onInit() {
      this.load();
    }

    load() {
      //
    }
  }

  angular.module('app').component('location', {
    templateUrl: 'views/location/location.html',
    controller: LocationController,
    controllerAs: '$ctrl',
    bindings: {}
  });
})();

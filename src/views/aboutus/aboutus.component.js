(() => {
  class AboutUsController {
    constructor() {
    }

    $onInit() {
      this.load();
    }

    load() {
      //
    }
  }

  angular.module('app').component('aboutus', {
    templateUrl: 'views/aboutus/aboutus.html',
    controller: AboutUsController,
    controllerAs: '$ctrl',
    bindings: {}
  });
})();

(() => {
  class NavbarController extends BaseController {
    constructor($interval) {
      super();

      this.currentlyAt = 'home';

      $interval(() => {
        let result = /^\#\!\/([a-z]+)$/.exec(window.location.hash);

        this.currentlyAt = _.isNull(result) ? 'home' : result[1];
      }, 100);
    }

    $onInit() {
      this.load();
    }

    load() {
      //
    }

    isAt(section) {
      return this.currentlyAt.toUpperCase().indexOf(section.toUpperCase()) > -1;
    }
  }

  angular.module('app').controller('NavbarController', NavbarController);
})();

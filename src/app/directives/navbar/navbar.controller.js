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
      this.products = [
        'Un producto',
        'Otro producto',
        'Guevo de plastico',
        'Carne mechada',
        'Taza de cafe',
        'Un producto NUEVOOOOOOOOOOO'
      ];
      this.load();
    }

    load() {
      //
    }
  }

  angular.module('app').controller('NavbarController', NavbarController);
})();

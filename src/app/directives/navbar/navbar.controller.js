(() => {
  class NavbarController extends BaseController {
    constructor($interval) {
      super();

      this.availableOptions = [
        {
          label: 'Inicio',
          sref: 'home'
        },
        {
          label: 'Quienes somos',
          sref: 'aboutus'
        },
        {
          label: 'Productos',
          sref: 'products',
          submenu: [
            {
              label: 'Sistema de exhibición y almacenaje',
              sref: 'products({ category: \'exhibition-storage })\''
            }
          ]
        },
        {
          label: 'Proyectos',
          sref: 'proyects'
        },
        {
          label: 'Servicios',
          sref: 'services'
        },
        {
          label: 'Ubicacion',
          sref: 'location'
        },
      ]

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
  }

  angular.module('app').controller('NavbarController', NavbarController);
})();

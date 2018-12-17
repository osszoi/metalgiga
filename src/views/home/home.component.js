(() => {
  class HomeController extends BaseController {
    constructor(HomeService) {
      super();
      this.HomeService = HomeService;

      this.clients = [
        {
          id: 1,
          name: 'AngularJS',
          logo: 'images/clients/angular.svg'
        },
        {
          id: 2,
          name: 'Amazon Web Service',
          logo: 'images/clients/aws.svg'
        },
        {
          id: 3,
          name: 'Cosmos',
          logo: 'images/clients/Cosmos.svg'
        },
        {
          id: 4,
          name: 'microsoft',
          logo: 'images/clients/Microsoft.svg'
        }
      ];
    }

    $onInit() {
      this.load();
    }

    load() {
      //
    }
  }

  angular.module('app').component('home', {
    templateUrl: 'views/home/home.html',
    controller: HomeController,
    controllerAs: '$ctrl',
    bindings: {}
  });
})();

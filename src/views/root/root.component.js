(() => {
  class RootController {
    constructor(Auth, NavbarService, UserService, $state, BroadcastService) {
      this.session = Auth.getSession();
      this.NavbarService = NavbarService;
      this.UserService = UserService;
      this.$state = $state;

      BroadcastService.catch('showFooter', () => {
        this.showFooter = true;
      });

      BroadcastService.catch('hideFooter', () => {
        this.showFooter = false;
      });

      this.showFooter = true;
    }

    $onInit() {
      //
    }
  }

  angular.module('app').component('root', {
    templateUrl: 'views/root/root.html',
    controller: RootController
  });
})();

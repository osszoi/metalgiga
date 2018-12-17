(() => {
  class NavbarAsideController {
    constructor($scope, Auth, PageService, ProfileService, PicklistService, NavbarService, HomeService, $rootScope, BroadcastService, $aside) {
      $scope.session = Auth.getSession();
      $scope.page = PageService;
      $scope.NavbarService = NavbarService;
      this.ProfileService = ProfileService;
      this.PicklistService = PicklistService;
      this.HomeService = HomeService;
      this.endPoint = 'me/pictures';
      this.BroadcastService = BroadcastService;
      this.$aside = $aside;
    }

    openProfileModal() {
      this.ProfileService.openUpdateModal('self');
    }

    openPicklistModal() {
      this.PicklistService.openPicklistModal().then((response) => {}, () => {});
    }

    openSettings() {
      this.HomeService.openSettings().then((response) => {});
    }

    openHomeSettings() {
      this.BroadcastService.cast('openHomeSettings');
    }
  }

  angular.module('app').controller('NavbarAsideController', NavbarAsideController);
})();

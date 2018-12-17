(() => {
  class UserCardController {
    constructor() {
      //
    }

    $onInit() {
      this.load();
    }

    load() {
      //
    }
  }

  angular.module('app').component('userCard', {
    templateUrl: 'views/users/users.card.html',
    controller: UserCardController,
    controllerAs: '$ctrl',
    bindings: {
      data: '=ngModel'
    }
  });
})();

(() => {
  class UsersConfirmParentController extends BaseController {
    constructor(UserService, Auth, Session) {
      super();
      this.UserService = UserService;
      this.Auth = Auth;
      this.Session = Session;
    }

    $onInit() {
      this.load();
    }

    load() {
      this.loadingPromise = this.UserService.confirmRelation(this.resolve.data).then((response) => {
        this.data = true;
      });
    }

    loginAs(token) {
      this.loadingPromise = this.UserService.get(token).then((response) => {
        let session = new this.Session(response.data);
        session.token = token;

        this.Auth._setUser(session);
        this.Auth.goHome();
        this.close();
      });
    }

    cancel() {
      this.modalInstance.dismiss();
    }

    close() {
      this.modalInstance.close();
    }
  }

  angular.module('app').component('usersConfirmParentModal', {
    templateUrl: 'views/users/users.confirmParent.modal.html',
    controller: UsersConfirmParentController,
    controllerAs: '$ctrl',
    bindings: {
      modalInstance: '<',
      resolve: '<'
    }
  });
})();

(() => {
  class UsersEditController extends BaseController {
    constructor(UserService, User, Message, Auth, PhoneService) {
      super();
      this.UserService = UserService;
      this.User = User;
      this.Message = Message;
      this.session = Auth.getSession();
      this.PhoneService = PhoneService;

      this.today = new Date();
    }

    $onInit() {
      this.data = new this.User({});
      this.load();
    }

    load() {
      this.loadingPromise = this.UserService.get(this.session.token)
        .then((response) => {
          this.data = new this.User(response.data);

          return this.PhoneService.listAllCountryCodes();
        })
        .then((response) => {
          this.countryCodes = response;
        });
    }

    save() {
      this.isSaving = true;

      this.loadingPromise = this.UserService.update(this.data.putPayload())
        .then((response) => {
          this.Message.show('Sus datos han sido actualizados.');
        })
        .finally(() => {
          this.isSaving = false;
        });
    }
  }

  angular.module('app').component('usersEdit', {
    templateUrl: 'views/users/users.edit.html',
    controller: UsersEditController
  });
})();

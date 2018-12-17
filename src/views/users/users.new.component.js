(() => {
  class UsersNewController extends BaseController {
    constructor(UserService, User, Message, Analytics, BroadcastService, JavaService, FacebookService) {
      super();
      this.UserService = UserService;
      this.User = User;
      this.Message = Message;
      this.Analytics = Analytics;
      this.BroadcastService = BroadcastService;
      this.JavaService = JavaService;
      this.FacebookService = FacebookService;

      this.isBusy = false;
    }

    $onInit() {
      this.data = new this.User({});
      this.load();

      this.googleRegisterListener = this.BroadcastService.catch('google-register-success', () => {
        if (this.isBusy) {
          //
        } else {
          this.isBusy = true;
          let result = this.BroadcastService.getParam();
          let data = this.JavaService.decodeJWT(result.id_token);

          this.data = new this.User({
            email: data.email,
            password: data.sub,
            username: data.email,
            loginFrom: 'Google',
            name: '',
            lastName: ''
          });

          this.save();
        }
      });

      this.Analytics.trackPage('register/account', 'New user account');
    }

    $onDestroy() {
      this.googleRegisterListener();
    }

    load() {
      //
    }

    cancel() {
      this.modalInstance.dismiss();
    }

    save() {
      this.isSaving = true;

      this.loadingPromise = this.UserService.create(this.data.postPayload())
        .then(
          (response) => {
            this.Message.show(response.msg || 'Usuario creado con éxito.');
            this.modalInstance.close(this.data);

            this.Analytics.trackPage('register/account/registered', 'User account created');
          },
          () => {
            // Clean form if logged in from social network
            if (this.isBusy) {
              this.data = new this.User({});
            }
          }
        )
        .finally(() => {
          this.isSaving = false;
          this.isBusy = false;
        });
    }

    facebookRegister() {
      this.FacebookService.me().then((response) => {
        this.isBusy = true;
        
        this.data = new this.User({
          email: response.email,
          password: response.id,
          username: response.email,
          loginFrom: 'Facebook',
          name: response.first_name,
          lastName: response.last_name
        });

        this.save();
      })
    }
  }

  angular.module('app').component('usersNew', {
    templateUrl: 'views/users/users.new.html',
    controller: UsersNewController,
    controllerAs: '$ctrl',
    bindings: {
      modalInstance: '<',
      resolve: '<'
    }
  });
})();

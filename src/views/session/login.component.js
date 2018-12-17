(() => {
  class LoginController {
    constructor(Auth, PageService, $location, UserService, PromptService, $timeout, $scope, Message, Session, JavaService, BroadcastService, FacebookService, Analytics) {
      this.Auth = Auth;
      this.Session = Session;
      this.UserService = UserService;
      this.JavaService = JavaService;
      this.credentials = {
        username: null,
        password: null
      };

      this.PageService = PageService;
      this.$location = $location;
      this.PromptService = PromptService;
      this.$timeout = $timeout;
      this.Message = Message;
      this.BroadcastService = BroadcastService;
      this.FacebookService = FacebookService;
      this.Analytics = Analytics;

      // Google Login
      $scope.$on('google-plus-signin-success', (event, authResult) => {
        if (this.isRegisterModalOpen) {
          this.BroadcastService.cast('google-register-success', authResult);
        } else {
          let response = this.JavaService.decodeJWT(authResult.id_token);

          this.credentials = {
            username: response.email,
            password: response.sub
          };

          this.isLoading = true;

          this.Auth.login(this.credentials, 'Google')
            .then((response) => {
              this.Auth.goHome();
            })
            .finally(() => {
              this.isLoading = false;
              this.credentials.username = null;
              this.credentials.password = null;
            });
        }
      });
    }

    $onInit() {
      this.load();
    }

    load() {
      this.Auth.logout();
      let qs = this.$location.search();

      this.$timeout(() => {
        if (!_.isEmpty(qs)) {
          if (!_.isUndefined(qs.parent) && !_.isUndefined(qs.child)) {
            // Confirm Parent
            this.UserService.openConfirmParentModal(qs).then((response) => {
              //
            });
          } else if (!_.isUndefined(qs.token) && _.isUndefined(qs.email) && _.isUndefined(qs.viewAs)) {
            this.PromptService.open({
              title: 'Recuperar contraseña',
              size: 'md',
              confirmButtonText: 'Cambiar contraseña',
              cancelButtonText: 'Cancelar',
              inputs: [
                {
                  label: 'Nueva Contraseña',
                  placeholder: '',
                  map: 'password',
                  type: 'password',
                  minlength: 8
                },
                {
                  label: 'Confirmar Nueva Contraseña',
                  placeholder: '',
                  map: '_new_password',
                  type: 'password',
                  minlength: 8,
                  compareTo: 0,
                  compareToErrorMessage: 'Las contraseñas no coinciden'
                }
              ]
            }).then((data) => {
              this.UserService.recoverPassword({ password: data.password }, qs.token).then((response) => {
                // Password changed
                this.Message.show('Contraseña cambiada con éxito', 'success', '');

                // Ask if want to login automatically
                // this.PromptService.open({
                //   text: `
                //   <div class="flex flex-column justify-content-center align-items-center margin-bottom">
                //     <i class="fa fa-fw fa-check text-success fa-4x"></i>
                //     <h4 class="hug-bottom margin-sm-top">Contraseña cambiada con éxito</h4>
                //   </div>

                //   <p class="text-right">¿Desea acceder a su cuenta?</p>
                //   `,
                //   title: 'Recuperar contraseña',
                //   size: 'sm',
                //   confirmButtonText: 'Sí',
                //   cancelButtonText: 'No'
                // }).then(() => {
                //   this.loadingPromise = this.UserService.get(qs.ForgottenPassword).then((response) => {
                //     let session = new this.Session(response.data);
                //     session.token = qs.ForgottenPassword;

                //     this.Auth._setUser(session);
                //     this.Auth.goHome();
                //     this.close();
                //   });
                // });
              });
            });
          } else if (!_.isUndefined(qs.token) && !_.isUndefined(qs.email)) {
            // Confirm email
            this.UserService.confirmEmail(qs).then((response) => {
              this.Message.show(`El email ${qs.email} ha sido confirmado éxitosamente`, 'success', 'Confirmación exitósa');
              this.Analytics.trackPage('register/account/confirmed', 'User account confirmed');
            });
          } else if (!_.isUndefined(qs.register)) {
            this.openRegisterModal();
          } else if (!_.isUndefined(qs.viewAs) && !_.isUndefined(qs.token)) {
            this.isLoading = true;

            this.Auth.emulate(qs.viewAs, qs.token).then((response) => {
              this.Auth.goHome()
            }).finally(() => {
              this.isLoading = false;
            })
          }
        }
      });
    }

    login(credentials) {
      this.isLoading = true;
      this.isError = false;

      this.Auth.login(credentials)
        .then(
          (response) => {
            this.Auth.goHome();
          },
          (response) => {
            this.isError = true;
          }
        )
        .finally(() => {
          this.isLoading = false;
        });
    }

    openRegisterModal() {
      this.isRegisterModalOpen = true;

      this.UserService.openRegisterModal()
        .then((response) => {
          // Automatically fill login fields
          this.credentials.username = response.username;
          this.credentials.password = null;
        })
        .finally(() => {
          this.isRegisterModalOpen = false;
        });
    }

    openForgotPasswordModal() {
      this.PromptService.open({
        title: 'Olvidé mi contraseña',
        size: 'md',
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cerrar',
        inputs: [
          {
            label: 'Correo electrónico',
            placeholder: '',
            type: 'email'
          }
        ]
      }).then((email) => {
        this.UserService.forgotPassword({ email }).then((response) => {
          this.Message.show(`Hemos enviado un correo a ${email} con un enlace para reestablecer la contraseña.`, 'success', 'Solicitud enviada');
        });
      });
    }

    loginFacebook() {
      this.FacebookService.me().then((response) => {
        let credentials = {
          username: response.email,
          password: response.id
        }

        this.isLoading = true;

        this.Auth.login(credentials, 'Facebook')
          .then((response) => {
            this.Auth.goHome();
          })
          .finally(() => {
            this.isLoading = false;
            this.credentials.username = null;
            this.credentials.password = null;
          });

      }, (err) => {
        if (err && err.message) {
          this.Message.show(err.message, 'error', 'Error al entrar con Facebook')
        }
      })
    }
  }

  angular.module('app').component('login', {
    templateUrl: 'views/session/login.html',
    controller: LoginController
  });
})();

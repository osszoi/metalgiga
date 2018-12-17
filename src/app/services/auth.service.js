(() => {
  class Auth {
    constructor(RESTful, StorageService, $q, $timeout, Session, $state, $uibModalStack, $rootScope) {
      this.RESTful = RESTful;
      this.StorageService = StorageService;
      this.$q = $q;
      this.$timeout = $timeout;
      this.Session = Session;
      this.$state = $state;
      this.$uibModalStack = $uibModalStack;
      this.$rootScope = $rootScope;
    }

    _setUser(session) {
      this._session = new this.Session(session);

      this.saveSession();

      return this._session;
    }

    changePicture(img) {
      this._session.profilePicturePath = `${img}?${new Date().getTime()}`;
      this.saveSession();
    }

    saveSession() {
      this.StorageService.put('session', this._session.getObject(), 's');
    }

    goHome() {
      this.$timeout(() => {
        this.$state.go('root.dashboard');
      });
    }

    goLogin(reload) {
      this.$timeout(() => {
        this.$state.go('login');
      });
    }

    emulate(userId, token) {
      let deferred = this.$q.defer();

      this.RESTful.get(`users/${userId}/emulate`, null, {
        headers: {
          Authorization: token
        }
      }).then(
        (response) => {
          let session = new this.Session(response.data);
          deferred.resolve(this._setUser(session));
        },
        (err) => {
          deferred.reject(err);
        }
      );

      return deferred.promise;
    }

    login(credentials, loginFrom = 'Dawere') {
      credentials['loginFrom'] = loginFrom;

      if (loginFrom === 'Google') {
        credentials['name'] = '';
        credentials['lastName'] = '';
      }

      let deferred = this.$q.defer();

      // To do: BE needs to send 401 responses with a proper structure because it can mean 'invalid credentials' and 'unauthorized'

      this.RESTful.post(
        'oauth/login',
        credentials,
        null,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        },
        false
      ).then(
        (response) => {
          let session = new this.Session(response.data);
          deferred.resolve(this._setUser(session));
        },
        (response) => {
          deferred.reject(response);
        }
      );

      return deferred.promise;
    }

    _destroy() {
      return this.$timeout(() => {
        this._session = undefined;
        this.StorageService.clear('session');
        this.StorageService.clear('local');

        // Close all modals
        this.$uibModalStack.dismissAll();
      });
    }

    logout() {
      return this._destroy();
    }

    getSession() {
      if (_.isEmpty(this._session)) {
        let cachedSession = this.StorageService.get('session', 's');

        if (!_.isEmpty(cachedSession)) {
          this._session = new this.Session(cachedSession);
        }
      }
      return this._session;
    }

    getToken() {
      if (_.isEmpty(this.getSession())) {
        return;
      }
      return this._session.token;
    }

    checkSession() {
      let deferred = this.$q.defer();

      if (_.isEmpty(this.getSession())) {
        deferred.reject();
        this.goLogin();
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    }
  }

  angular.module('app').service('Auth', Auth);
})();

;(() => {

  class FacebookService {
    constructor($q) {
      this.$q = $q;

      FB.Event.subscribe('auth.authResponseChange', (response) => {
        console.log(response)

        if (response.status === 'connected') {
          console.log('Connected!')
        }
      })
    }

    me() {
      let deferred = this.$q.defer();

      FB.login((response) => {
        if (_.isObject(response.authResponse)) {
          //deferred.resolve(response.authResponse);

          FB.api('/me', {
            fields: 'email,first_name,last_name'
          }, (response) => {
            if (!response || response.error) {
              console.log('Error at api:', response);
              deferred.reject({
                message: 'Ha ocurrido un error.'
              })
            }
            else {
              deferred.resolve(response);
            }
          })
        }
        else {
          if (_.isUndefined(response.authResponse) && _.isUndefined(response.status)) {
            deferred.reject();
          }
          else {
            console.log('Error at login:', response);
            deferred.reject({
              message: 'Ha ocurrido un error al intentar entrar con Facebook.'
            })
          }
        }
      })

      return deferred.promise;
    }
  }

  angular.module('app')
    .service('FacebookService', FacebookService);

})();
  
  

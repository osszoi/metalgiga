;(() => {

  class JavaService {
    constructor() {
      //
    }

    decodeJWT(jwt) {
      let base64Url = jwt.split('.')[1];
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
  }

  angular.module('app')
    .service('JavaService', JavaService);

})();
  
  

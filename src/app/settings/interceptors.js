function stringToDate(input) {
  // http://jsfiddle.net/kQZw8/157/
  let regexIso8601 = /^\d{4}-\d{1,2}-\d{1,2}(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?$/i,
    regexTime = /^([\d]{1,2}):([\d]{1,2}):([\d]{1,2})(\.\d*)?$/i,
    minDate = '1971-01-01';

  // Ignore things that aren't objects.
  if (typeof input !== 'object') {
    return input;
  }

  for (let key in input) {
    if (!input.hasOwnProperty(key)) {
      continue;
    }

    let value = input[key],
      match;

    // Process "HH:mm.ss"
    if (typeof value === 'string' && value.match(regexTime)) {
      // Append current date
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      // Padding
      month = (month < 10 ? '0' : '') + month;
      day = (day < 10 ? '0' : '') + day;
      // input[key] = value = `${year}-${month}-${day}T${value}Z`;
      input[key] = value = `${minDate}T${value}Z`;
    }

    // Check for string properties which look like dates.
    // TODO: Improve this regex to better match ISO 8601 date strings.
    if (typeof value === 'string' && (match = value.match(regexIso8601))) {
      // match[1] = "THH:mm:ssZ" or null if the date is "2017-12-25"
      // We need to append the current time THH:mm:ssZ
      match[1] = !match[1] ? new Date().toJSON().substr(10) : '';
      // Get date string
      let dateStr = match[0] + match[1];
      // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
      let milliseconds = Date.parse(dateStr);
      if (!isNaN(milliseconds)) {
        let year = parseInt(dateStr.substr(0, 4));
        let month = parseInt(dateStr.substr(5, 2)) - 1;
        let day = parseInt(dateStr.substr(8, 2));
        let hours = parseInt(dateStr.substr(11, 2));
        let minutes = parseInt(dateStr.substr(14, 2));
        let seconds = parseInt(dateStr.substr(17, 2));
        input[key] = new Date(year, month, day, hours, minutes, seconds);
      }
    } else if (typeof value === 'object') {
      // Recurse into object
      stringToDate(value);
    }
  }
}

function dateToString(input) {
  let regexIso8601 = /\d{4}-\d{1,2}-\d{1,2}(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)/gi;

  if (typeof input === 'string') {
    let matches = input.match(regexIso8601) || [];

    matches.forEach((value) => {
      let date = new Date(value);

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      month = (month < 10 ? '0' : '') + month;
      day = (day < 10 ? '0' : '') + day;
      hours = (hours < 10 ? '0' : '') + hours;
      minutes = (minutes < 10 ? '0' : '') + minutes;
      seconds = (seconds < 10 ? '0' : '') + seconds;

      let strDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

      input = input.replace(new RegExp(value, 'ig'), strDate);
    });
  }
  return input;
}

angular.module('app').config(($httpProvider) => {
  $httpProvider.defaults.transformResponse.push((response) => {
    stringToDate(response);
    return response;
  });

  $httpProvider.defaults.transformRequest.push((request) => {
    return dateToString(request);
  });

  $httpProvider.interceptors.push([
    '$q',
    '$location',
    '$injector',
    '$rootScope',
    '$timeout',
    ($q, $location, $injector, $rootScope, $timeout) => {
      return {
        request: (config) => {
          let Auth = $injector.get('Auth');

          // Parent confirmation
          if (config.url.indexOf('confirmRelation') !== -1) {
            config.headers['Authorization'] = config.data.child;
          }

          // Forgotten Password
          // if (config.url.indexOf('changeForgottenPassword') !== -1) {
          //   config.headers['Authorization'] = config.data.password;
          // }

          if (config.url.indexOf('api.mercadopago.com') === -1) {
            config.headers['Authorization'] = config.headers['Authorization'] || Auth.getToken();
          }

          return config || $q.when(config);
        },

        response: (response) => {
          $rootScope.$broadcast('resizeAllMaps');
          return response || $q.when(response);
        },

        responseError: (rejection) => {
          let toastr = $injector.get('toastr'),
            Auth = $injector.get('Auth'),
            type = 'error',
            textContent = 'Algo malo ha ocurrido. Por favor intenta nuevamente.';

          // No internet
          if (rejection.status === -1) {
            return $q.reject(rejection);
          }

          if (rejection.status === 401) {
            type = 'warning';

            if (_.isEmpty(Auth.getSession())) {
              if (rejection.config.data.loginFrom === 'Dawere') {
                textContent = 'Usuario o contraseña inválida';
              } else {
                textContent = 'Por favor inicia sesión a través del mismo servicio con el que creaste tu cuenta';
              }
            } else {
              textContent = 'Su sesión ha expirado. Por favor inicie sesión nuevamente.';
              // Despues de mostrar el mensaje redirijo
              Auth.goLogin();
            }
          }

          if (rejection.status === 403) {
            if (rejection.data && _.isArray(rejection.data.message)) {
              textContent = _.size(rejection.data.message) > 1 ? rejection.data.message.join('.<br>') : `${_.first(rejection.data.message)}.`;
            } else {
              //textContent = `${rejection.data.message}.`;
              // Forbiden
              textContent = 'Permisos insuficientes.';
            }
          }

          if (rejection.status === 404) {
            // Forbiden
            textContent = 'El servicio no está disponible.';
          }

          if (rejection.status === 400 || rejection.status === 500) {
            if (rejection.data && rejection.data.msg) {
              textContent = rejection.data.msg;
            }
          }

          // Message
          switch (type) {
            case 'warning':
              toastr.warning(textContent, 'Alerta');
              break;
            case 'error':
              toastr.error(textContent, 'Error');
            default:
              toastr.info(textContent, 'Información');
          }

          console.error('Failed with', rejection);
          return $q.reject(rejection);
        }
      };
    }
  ]);
});

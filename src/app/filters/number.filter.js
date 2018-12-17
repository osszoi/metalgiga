angular
  .module('app')
  // Transforms 1000 to 1K, 1000000 to 1M
  .filter('numberPrettify', () => {
    return (n) => {
      if (!n) {
        return n;
      }

      let _n = n;
      let r = 0;

      while (_n >= 1000) {
        _n /= 1000;
        r++;
      }

      let s = String(_n);
      let sp = s.split('.');
      let l = r === 0 ? '' : r === 1 ? 'K' : 'M';

      return sp[0] + (sp.length > 1 ? '.' + sp[1][0] : '') + l;
      //return sp[0] + l;
    };
  })

  .filter('filesize', () => {
    return (size) => {
      if (isNaN(size)) {
        size = 0;
      }

      if (size < 1024) {
        return size + ' Bytes';
      }

      size /= 1024;
      if (size < 1024) {
        return size.toFixed(2) + ' Kb';
      }

      size /= 1024;
      if (size < 1024) {
        return size.toFixed(2) + ' Mb';
      }

      size /= 1024;
      if (size < 1024) {
        return size.toFixed(2) + ' Gb';
      }

      size /= 1024;
      return size.toFixed(2) + ' Tb';
    };
  })

  // 23:59 => 24:00
  .filter('twentyFourRound', () => {
    return (input) => {
      if (!_.isNumber(input)) {
        return input;
      }
      return input >= 23.98 ? 24 : input;
    };
  })
  .filter('durationPrettify', ($filter) => {
    return (input) => {
      if (_.isNull(input) || _.isUndefined(input)) {
        return 'N/A';
      }

      let hours = 0;
      let minutes = 0;
      let _input = angular.copy(input);

      // Get hours
      while (_input >= 3600) {
        _input -= 3600;
        hours++;
      }

      // Get minutes
      while (_input >= 60) {
        _input -= 60;
        minutes++;
      }

      let finalStr = '';

      if (hours > 0) {
        finalStr = `${$filter('number')(hours, 0)} horas`;
      }

      if (minutes > 0) {
        finalStr += (finalStr.length > 0 ? ', ' : '') + `${$filter('number')(minutes, 0)} minutos`;
      }

      if (_input > 0) {
        finalStr += (finalStr.length > 0 ? ', ' : '') + `${$filter('number')(_input, 0)} segundos`;
      }

      return finalStr;
    };
  })
  .filter('scorePrettify', () => {
    return (input) => {
      if (_.isNull(input) || _.isUndefined(input) || input === 0) {
        return 'N/P';
      }

      return `${input} pts`;
    };
  })
  .filter('toCurrency', (LocationService, $filter) => {
    return (input) => {
      if (!_.isNumber(input)) {
        return input;
      }

      return $filter('currency')(input, LocationService.isVenezuela() ? 'BsS. ' : 'USD ');
    };
  });

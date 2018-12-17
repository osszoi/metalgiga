angular.module('app').directive('numbersOnly', () => {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ngModelCtrl) {
      let fromUser = (text) => {
        if (text) {
          let transformedInput = text.replace(/[^0-9]/g, '');

          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        return undefined;
      };

      ngModelCtrl.$parsers.push(fromUser);
    }
  };
});

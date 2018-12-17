;(() => {

angular.module('app')
  .directive('plTypeahead', () => ({
    templateUrl: 'app/directives/plTypeahead/plTypeahead.html',
    restrict: 'E',
    replace: true,
    require: 'ngModel',
    link: ($scope, element, attrs, ngModel) => {
      $scope.field = _.isEmpty($scope.field) ? 'itemValue' : $scope.field;
      $scope.minLength = _.isUndefined(attrs.plMinlength) ? 2 : parseInt(attrs.plMinlength);

      $scope.getAsValue = (item) => {
        if (_.isEmpty(item)) {
          return;
        }
        let fields = $scope.field.split('.');
        return _.reduce(fields, (o, field) => {
          return _.has(o, field) ? o[field] : undefined;
        }, item);
      };

      ngModel.$validators.required = (modelValue, viewValue) => {
        // 1) si es requerido pero el modelValue esta vacio
        if (attrs.required && _.isEmpty(modelValue)) {
          return $scope.isValid = false;
        }
        return $scope.isValid = true;
      };

      ngModel.$validators.pendingToAdd = (modelValue, viewValue) => {
        if (_.isEmpty(modelValue)) {
          $scope.pendingToAdd = false;
          return true;
        }
        // 1) si puede agregar nuevas entradas y el modelValue no tiene ID (necesita agregar)
        if ($scope.allowNewEntries && !_.isObject(modelValue) && !_.has(modelValue, 'id')) {
          $scope.pendingToAdd = true;
          return false;
        }
        $scope.pendingToAdd = false;
        return true;
      };
    },
    scope: {
      // 2-way-bind
      entry: '=ngModel',
      allowNewEntries: '=plPermission',
      // Values
      field: '@plField',
      placeholder: '@',
      // Methods
      list: '&plList',
      create: '&plCreate',
      onSelect: '&plOnSelect',
      change: '&ngChange',
    },
  }));

})();

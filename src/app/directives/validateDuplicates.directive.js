;(() => {

  let link = ($scope, element, attrs, api) => {
    api.$validators.duplicated = (value) => {
      if (_.isEmpty($scope.list)) {
        return true;
      }
      let list = _.map($scope.list, (o) => o.toLowerCase()),
        term = _.isString(value) ? angular.copy(value).toLowerCase() : value;

      return !_.contains(list, term);
    };

    $scope.$watch('list', () => {
      api.$validate();
    });
  };

  angular.module('app')
    .directive('validateDuplicate', () => ({
      restrict: 'A',
      link: link,
      require: 'ngModel',
      scope: {
        list: '=validateDuplicate',
      },
    }));

})();

(() => {
  angular.module('app').directive('notFound', () => ({
    restrict: 'E',
    // replace: true,
    transclude: true,
    templateUrl: 'app/directives/notFound/notFound.html',
    link: ($scope, element, attrs, api, transclude) => {
      //
    },
    scope: {
      message: '@',
      expression: '=',
      title: '@',
      image: '@',
      btnLabel: '@',
      btnFn: '&',
      btnClass: '@'
    }
  }));
})();

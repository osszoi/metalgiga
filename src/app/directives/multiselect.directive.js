;(() => {

angular.module('app')
  .directive('multiselect', () => ({
    restrict: 'A',
    require: '?ngModel',
    link: ($scope, element, attrs, ngModel) => {
      element.multiselect({
        maxHeight: 200,
        numberDisplayed: $scope.numberDisplayed || 2,
        buttonClass: $scope.buttonClass || 'btn btn-default',
        buttonWidth: '100%',
        // includeSelectAllOption: $scope.includeSelectAllOption || false,
        // selectAllText: $scope.selectAllText || 'Select All',
        // selectAllValue: $scope.selectAllValue || 'multiselect-all',
        // filterBehavior: $scope.filterBehavior || 'text',
        // enableFiltering: true,
        // enableCaseInsensitiveFiltering: true,
        // filterPlaceholder: 'Search...',

        // Replicate the native functionality on the elements so
        // that angular can handle the changes for us.
        onChange(optionElement, checked) {
          console.log('has changed!');
          element.change();
        },
      });

      // console.log(element[0]);

      // $scope.$watch(() => element[0], () => {
      //   console.log('rebuild');
      //   element.multiselect('rebuild');
      // });

      // Watch for any changes from outside the directive and refresh
      $scope.$watch(ngModel, () => {
        element.multiselect('refresh');
      });
    },
    scope: {
      ngModel: '=?',
      numberDisplayed: '@',
      buttonClass: '@',
      // buttonWidth: '@',
      // includeSelectAllOption: '@',
      // selectAllText: '@',
      // selectAllValue: '@',
      // enableFiltering: '@',
      // filterBehavior: '@',
      // filterPlaceholder: '@',
    },
  }));

})();

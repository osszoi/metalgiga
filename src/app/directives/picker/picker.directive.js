;(() => {

angular.module('app')
  .directive('picker', () => ({
    templateUrl: 'app/directives/picker/picker.html',
    restrict: 'E',
    // controller: 'PickerController',
    link: ($scope, element, attrs, api) => {
      let loaded = false;
      // Attrs
      $scope.idAttr = !_.isEmpty($scope.idAttr) ? $scope.idAttr : 'id';
      $scope.titleAttr = !_.isEmpty($scope.titleAttr) ? $scope.titleAttr : '$index';
      $scope.subtitleAttr = !_.isEmpty($scope.subtitleAttr) ? $scope.subtitleAttr : null;
      // Settings
      $scope.pickerIcon = !_.isEmpty($scope.pickerIcon) ? $scope.pickerIcon : 'fa-list-ul';
      $scope.reverse = !_.isEmpty($scope.reverse) ? $scope.reverse === 'true' : false;
      $scope.selectLastItem = !_.isEmpty($scope.selectLastItem) ? $scope.selectLastItem === 'true' : false;
      // Show/hide buttons
      $scope.showCreateButton = !_.isEmpty($scope.showCreateButton) ? $scope.showCreateButton === 'true' : false;
      $scope.showDeleteButton = !_.isEmpty($scope.showDeleteButton) ? $scope.showDeleteButton === 'true' : false;
      $scope.showAttachmentButton = !_.isEmpty($scope.showAttachmentButton) ? $scope.showAttachmentButton === 'true' : false;
      $scope.showCommentsButton = !_.isEmpty($scope.showCommentsButton) ? $scope.showCommentsButton === 'true' : false;

      $scope.setItem = (item) => {
        if (_.isEmpty(item)) {
          return;
        }

        loaded = true;

        $scope.itemSelected = item;
        // Call back
        if (_.isFunction($scope.pickerOnChange)) {
          $scope.pickerOnChange({ '$item': item });
        }
      };

      $scope.$watch('pickerList', (newValue, oldValue) => {
        // Fix: dont autoset element when the array change
        // Just do it the first time, when the array is empty
        if (oldValue.length !== 0) {
          return;
        }
        // Autoset
        if ($scope.selectLastItem) {
          $scope.setItem(_.last($scope.pickerList));
        } else {
          $scope.setItem(_.first($scope.pickerList));
        }
      }, true);
    },
    scope: {
      // Settings
      pickerList: '=pickerList',
      itemSelected: '=ngModel',
      reverse: '@reverse',
      selectLastItem: '@selectLastItem',
      pickerIcon: '@pickerIcon',
      // Methods
      pickerReload: '&pickerReload',
      pickerOnChange: '&pickerOnChange',
      pickerOnCreate: '&pickerOnCreate',
      pickerOnDelete: '&pickerOnDelete',
      pickerOnAttach: '&pickerOnAttach',
      pickerOnComment: '&pickerOnComment',
      pickerOnReport: '&pickerOnReport',
      // Show/hide icons
      showCreateButton: '@showCreateButton',
      showDeleteButton: '@showDeleteButton',
      showAttachmentButton: '@showAttachmentButton',
      showCommentsButton: '@showCommentsButton',
      showReportButton: '@showReportButton',
      // Attrs
      titleAttr: '@titleAttr',
      subtitleAttr: '@subtitleAttr',
      idAttr: '@idAttr',
    },
  }));

})();

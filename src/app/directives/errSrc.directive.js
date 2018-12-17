angular.module('app')
  .directive('defaultCatalog', function () {
    return {
      scope: true,
      link: function (scope, element, attrs) {
        element.bind('error', function () {
          if (attrs.src !== 'images/default-catalog.png') {
            attrs.$set('src', 'images/default-catalog.png');
          }
        });

        attrs.$observe('ngSrc', function (value) {
          if (!value && 'images/default-catalog.png') {
            attrs.$set('src', 'images/default-catalog.png');
          }
        });
      }
    };
  })

  .directive('defaultUser', function () {
    return {
      scope: true,
      link: function (scope, element, attrs) {
        element.bind('error', function () {
          if (attrs.src !== 'images/no-picture-profile.png') {
            attrs.$set('src', 'images/no-picture-profile.png');
          }
        });

        attrs.$observe('ngSrc', function (value) {
          if (!value && 'images/no-picture-profile.png') {
            attrs.$set('src', 'images/no-picture-profile.png');
          }
        });
      }
    };
  });

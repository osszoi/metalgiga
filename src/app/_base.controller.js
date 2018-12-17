class BaseController {
  constructor() {
    this.$scope = null;
    this.id = this.id || Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }

  scrollToTop() {
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      $('.topic-content').scrollTop(0);
    }, 50);
  }

  getHTMLElement(id) {
    let elem;

    $('.ng-scope').each(function() {
      let scope = angular.element(this).scope();
      let scopeId = scope.$id;

      if (scopeId + (!_.isNull(scope.$$childHead) ? 1 : 0) + (!_.isNull(scope.$$childTail) ? 1 : 0) === id) {
        elem = this;
        return false;
      }
    });

    return elem;
  }

  switchComposeState() {
    if (_.isUndefined(this.$scope) || _.isNull(this.$scope)) {
      console.warn('$scope variable is not defined when trying to minimize the compose window. You need to inject $scope in the controller and set it to \'this.$scope\'');
      return;
    }

    this.$scope.isCollapsed = !this.$scope.isCollapsed;
    let elem = this.getHTMLElement(this.$scope.$id);

    if ($(elem).hasClass('compose-minimized')) {
      $(elem).removeClass('compose-minimized');
    } else {
      $(elem).addClass('compose-minimized');
    }
  }
}

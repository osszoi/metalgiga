;(() => {

  class CommentsSingleViewComponent {
    constructor(CommentsService, $timeout, Auth) {
      this.CommentsService = CommentsService;
      this.$timeout = $timeout;
      this.session = Auth.getSession();
    }

    $onInit() {
      this.load();
    }

    load() {
      this.loadingPromise = this.CommentsService.get(this.resolve.id)
        .then((response) => {
          this.data = response.data;
        });
    }

    close() {
      this.modalInstance.close('closing');
      // Not refresh anymore
      this.CommentsService.disableRefreshing(false);
    }

    openComments() {
      this.CommentsService.open(this.data.recordId, this.data.entityName, this.data)
        .then((response) => {
          this.close()
        })
    }
  }

  angular.module('app')
    .component('commentsSingleView', {
      templateUrl: 'app/directives/comments/comments.single.view.html',
      controller: CommentsSingleViewComponent,
      bindings: {
        modalInstance: '<',
        resolve: '<',
      }
    });

})();

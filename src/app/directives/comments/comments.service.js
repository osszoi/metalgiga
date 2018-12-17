;(() => {

  class CommentsService extends BaseService {
    constructor($uibModal, RESTful) {
      super();
      this.$uibModal = $uibModal;
      this.RESTful = RESTful;
    }

    open(id, entity, comment = null) {
      if (_.isEmpty(id) || _.isEmpty(entity)) {
        return;
      }

      this._isRefreshing = true;

      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'commentsModal',
        keyboard: false,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: 'static',
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'md',
        resolve: {
          id: () => id,
          entity: () => entity,
          comment: () => comment
        }
      });

      return modalInstance.result;
    }

    singleView(id) {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'commentsSingleView',
        keyboard: false,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: true,
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'md',
        resolve: {
          id: () => id
        }
      });

      return modalInstance.result;
    }

    isRefreshing() {
      return this._isRefreshing;
    }

    disableRefreshing() {
      this._isRefreshing = false;
    }

    comment(id, text, entityName) {
      if (_.isEmpty(id) || _.isEmpty(entityName)) {
        return;
      }

      return this.RESTful.post(`comments/${id}`, {
        recordId: id,
        text,
        entityName
      });
    }

    getCounter(id) {
      return this.RESTful.get(`comments/${id}/count`);
    }

    load(id, query) {
      query.expand = _.isString(query.expand) ? query.expand : this.getExpand(['user']);

      let params = angular.copy(query);

      // Calculating actual page
      if (!_.isUndefined(params.page)) {
        params.page--;
      }

      if (_.isEmpty(id)) {
        return;
      }

      return this.RESTful.get(`comments/${id}`, params);
    }

    typeaheadUsers(keyword) {
      return this.RESTful.get('users', { keyword, simple: true })
    }

    get(id) {
      return this.RESTful.get(`comments/${id}`, { single: true })
    }
  };

  angular.module('app')
    .service('CommentsService', CommentsService);

})();

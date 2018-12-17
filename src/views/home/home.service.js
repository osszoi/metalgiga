(() => {
  class HomeService extends BaseService {
    constructor($uibModal, RESTful, Message) {
      super();
      this.$uibModal = $uibModal;
      this.RESTful = RESTful;
      this.Message = Message;
    }
  }

  angular.module('app').service('HomeService', HomeService);
})();

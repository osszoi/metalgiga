(() => {
  class UserService extends BaseService {
    constructor($uibModal, RESTful, Message, Auth) {
      super();
      this.$uibModal = $uibModal;
      this.RESTful = RESTful;
      this.Message = Message;
      this.session = Auth.getSession();
    }

    get(token = this.session.token) {
      return this.RESTful.get(
        'users',
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        },
        false
      );
    }

    find(query = {}) {
      return this.RESTful.get('users/email', query);
    }

    create(payload) {
      return this.RESTful.post('oauth/signup', payload);
    }

    update(payload) {
      return this.RESTful.put('users', payload);
    }

    confirmEmail(payload) {
      return this.RESTful.post('oauth/confirm', payload);
    }

    updateEmail(payload) {
      return this.RESTful.put('users/email', payload);
    }

    updatePassword(payload) {
      return this.RESTful.post('oauth/passwords', payload);
    }

    forgotPassword(payload) {
      // To do: Backend must NOT return the user DTO here
      return this.RESTful.post('users/password/forgot', payload);
    }

    recoverPassword(payload, token) {
      // To do: Backend must NOT return the user DTO here
      return this.RESTful.put(`users/password?token=${token}`, payload);
    }

    requestRelation(userId) {
      return this.RESTful.post(`users/${userId}/parents`);
    }

    confirmRelation(payload) {
      return this.RESTful.post('users/parents', payload);
    }

    getEmailNotifications() {
      return this.RESTful.get('users/notification');
    }

    saveEmailNotifications(payload) {
      return this.RESTful.put('users/notification', payload);
    }

    openRegisterModal() {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'usersNew',
        keyboard: false,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: 'static',
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'lg',
        resolve: {}
      });

      return modalInstance.result;
    }

    openConfirmParentModal(data) {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'usersConfirmParentModal',
        keyboard: false,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: 'static',
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'md',
        resolve: {
          data: () => data
        }
      });

      return modalInstance.result;
    }
  }

  angular.module('app').service('UserService', UserService);
})();

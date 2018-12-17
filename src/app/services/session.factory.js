angular.module('app').factory('Session', (StorageService) => {
  class Session extends BaseFactory {
    constructor({ token = null, address = null, birthdate = null, document = null, cellphone = null, completeData = null, confirmed = null, email = null, found = null, id = null, lastName = null, name = null, profile = null, purchased = null, relationConfirmed = null, role = null, score = null, send_notifications = null, username = null, country = null }) {
      // Parent
      super({ token, address, birthdate, document, cellphone, completeData, confirmed, email, found, id, lastName, name, profile, purchased, relationConfirmed, role, score, send_notifications, username, country });

      // Sort permissions
      //this.role.permission = _.sortBy(this.role.permission, (entity) => entity.entityName);

      // _.each(this.role.permission, (value) => {
      //   // Sort actions
      //   value.sysAction = _.sortBy(value.sysAction, (action) => action.actionName);
      //   // Uppercase to all entity
      //   value.entityName = _.isEmpty(value.entityName) || !_.isString(value.entityName) ? null : value.entityName.toUpperCase();
      // });
    }

    // Permissions
    can(entityName = null, action = null) {
      if (_.isEmpty(entityName)) {
        return false;
      }

      if (_.isEmpty(action) || !_.isString(action)) {
        return false;
      }

      if (_.isString(entityName)) {
        return this._can(entityName, action);
      } else if (_.isArray(entityName)) {
        let can = false;

        _.each(entityName, (entity) => {
          if (!can) {
            can = this._can(entity, action);
          }
        });

        return can;
      } else {
        return false;
      }
    }

    _can(entityName = null, action = null) {
      // All in UpperCase
      entityName = entityName.toUpperCase();
      action = action.toUpperCase();

      let isEntityNameExists = _.findWhere(this.role.permission, { entityName });

      if (!_.isEmpty(isEntityNameExists)) {
        return _.contains(
          _.map(isEntityNameExists.sysAction, (value) => {
            return value.actionName.toUpperCase();
          }),
          action
        );
      }

      return false;
    }

    printPermissions() {
      let table = _.reduce(
        this.role.permission,
        (memo, entity, key, list) => {
          _.each(entity.sysAction, (action) => {
            memo.push({
              entity: entity.entityName,
              action: action.actionName
            });
          });
          return memo;
        },
        []
      );

      console.table(table);
    }
  }

  return Session;
});

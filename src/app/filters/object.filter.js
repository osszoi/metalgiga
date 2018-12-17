angular.module('app')
/* Returns the field value of an object
* Examples:
*
*     {{ user | getField:'name':'id':'1' }} Returns the 'name' field of the object which 'id' is '1'
*/
  .filter('getField', () => {
    return (obj, nameField, idField, idValue) => {
      if (_.isString(idValue)) {
        if (idValue[0] === '{' && idValue[idValue.length - 1] === '}') {
          idValue = JSON.parse(idValue);
        }
      }

      for (let i = 0; i < obj.length; i++) {
        if (!_.isObject(idValue)) {
          if (obj[i][idField] === idValue) {
            return obj[i][nameField];
          }
        }
        else {
          if (obj[i][idField] === idValue[idField]) {
            return obj[i][nameField];
          }
        }
      }

      return 'N/A';
    };
  })
  .filter('fix24Hours', ($filter) => {
    return (input) => {
      if (!_.isDate(input)) {
        return input;
      }

      if (input.getHours() === 23 && input.getMinutes() === 59 && input.getSeconds() === 59) {
        return '24:00';
      } else {
        return $filter('date')(input, 'HH:mm');
      }
    };
  });

angular.module('xeditable')
  .directive('editableTimepicker', (editableDirectiveFactory) => {
    return editableDirectiveFactory({
      directiveName: 'editableTimepicker',
      inputTpl: '<div uib-timepicker show-meridian="false" show-spinners="false"><div>'
    });
  })

  .directive('editableTags', (editableDirectiveFactory) => {
    return editableDirectiveFactory({
      directiveName: 'editableTags',
      inputTpl: '<tags-input></tags-input>'
    });
  })

  .directive('editableAutocompleteTags', (editableDirectiveFactory) => {
    return editableDirectiveFactory({
      directiveName: 'editableAutocompleteTags',
      inputTpl: '<tags-input><auto-complete source="$ctrl.loadTags($query)"></auto-complete></tags-input>'
    });
  });


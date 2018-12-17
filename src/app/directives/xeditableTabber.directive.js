;(() => {

  angular.module('app')
    .directive('xeditableTabber', ($timeout) => ({

      restrict: 'EA',
      link: ($scope, localElement, attrs, api) => {

        let $head = $('head');
        let $global = $head.data('xeditableTabber');
        if (!$global) {
          $global = { name: 'xeditableTabber' };
          $head.data('xeditableTabber', $global);

          let actionTabber = function (e) {
            let $editable = $global.lastEditableTab;
            let inputEl = $editable.inputEl;
            let submitEl = $editable.submitEl;
            let editorEl = $editable.editorEl;
            let element = $editable.editableElement;
            // todo: move this to editable-form!

            let inputType = (inputEl.prop('type') || 'text' ).toLowerCase();
            let myType = inputEl.prop('childNodes')[0];
            switch (e.keyCode) {
              case 9:
                // identifica que tipo de xeditable es
                if (inputEl) {
                  if (inputEl.prop('pattern')) {
                    if (!inputEl.val().match(inputEl.prop('pattern'))) {
                      break;
                    }
                  }
                  if (inputType === 'number' || inputType === 'range') {
                    if (inputEl.prop('min')) {
                      let value = inputEl.val();
                      let min = inputEl.prop('min');
                      if (isNaN(value) || isNaN(min) || parseFloat(min) > parseFloat(value)) {
                        break;
                      }
                    }
                    if (inputEl.prop('max')) {
                      let value = inputEl.val();
                      let max = inputEl.prop('max');
                      if (isNaN(value) || isNaN(max) || parseFloat(max) < parseFloat(value)) {
                        break;
                      }
                    }
                  }
                  if (inputType === 'email') {
                    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test('email')) {
                      break;
                    }
                  }

                }
                // verifica que el xeditbla tenga atributos 
                let hasAttribute = element.attr('xeditable-tabber') !== undefined;
                let nextBreak = 0;
                let NextXeditable = true;
                let FocusNext = false;
                editorEl.find('input').each(function () {

                  if (!NextXeditable) {
                    return
                  }
                  ;
                  let $input = $(this);

                  if (FocusNext) {
                    //$input.focus();
                    NextXeditable = false;
                  }
                  if ($input.is(':focus')) {

                    FocusNext = true;
                  }
                });
                //}

                if (NextXeditable) {
                  if (editorEl && editorEl.is(':visible')) {
                    editorEl.submit();
                  }

                  $('[xeditable-tabber]').each(function () {

                    if (nextBreak === 2) {
                      return
                    }
                    ;
                    if (nextBreak === 1) {
                      $(this).click();

                      nextBreak = 2;
                      e.preventDefault();
                      return;
                    }
                    if ($(this).is(element)) {
                      nextBreak = 1;
                    }
                  });
                }
                break;
            }
          };
          // detecta la acion tab 
          $('html').on('keydown', function (e) {
            switch (e.keyCode) {
              case 9:
                actionTabber(e);
                break;
            }
          });
        }

        let showListener = function () {
          $global.lastEditableTab = $scope.$editable;
          $global.lastEditableTab.editableElement = localElement;
        };
        let loadXeditableTabber = function () {

          let $editable = $scope.$editable;

          if (!$editable) {
            return
          }
          ;
          let oldShow = $editable.show;
          $editable.show = function () {
            oldShow();
            showListener();
          };
        };
        setTimeout(loadXeditableTabber, 200);

      }
    }));

})();

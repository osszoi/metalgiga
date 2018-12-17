angular.module('app')
  .factory('File', () => {

    class File extends BaseFactory {
      constructor({ name = null, fileExtension = null, path = null, size = null, id = null, tag = null, isActive = null, isDeleted = null, createdBy = null, createdAt = null, updatedBy = null, updatedAt = null }) {

        super({ name, fileExtension, path, size, id, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt, tag });
      }

      get faType() {
        // list of extensions taken from https://en.wikipedia.org/wiki/List_of_Microsoft_Office_filename_extensions
        if (this.fileExtension.match(/doc|docx|dot|wbk|docm|dotx|dotm|docb/gi)) {
          return '-word-o';
        }
        else if (this.fileExtension.match(/xls|xlt|xlm|xlsx|xlsm|xltx|xltm/gi)) {
          return '-excel-o';
        }
        else if (this.fileExtension.match(/ppt|pot|pps|pptx|pptm|potx|potm|ppam|ppsx|ppsm|sldx|sldm/gi)) {
          return '-powerpoint-o';
        }
        else if (this.fileExtension.match(/jpg|png|bmp/gi)) {
          return '-image-o';
        }
        else if (this.fileExtension.match(/pdf/gi)) {
          return '-pdf-o';
        }
        else if (this.fileExtension.match(/txt/gi)) {
          return '-text-o';
        }
        else {
          return '-o';
        }
      }

      payload(field, value) {
        return {
          [field]: value,
        };
      }
    }

    return File;
  });

angular.module('app').factory('User', (StorageService) => {
  class User extends BaseFactory {
    constructor({ address = null, birthdate = null, document = null, cellphone = null, email = null, id = null, lastName = null, name = null, username = null, gender = null, identificationNumberType = 'V', cellphoneOperator = null, profile = { cellphone: null, instagram: null, twitter: null, cellphoneOperator: null }, password = null, loginFrom = 'Dawere', role = 'STUDENT', country = null }) {
      // Parent
      super({ address, birthdate, document, cellphone, email, id, lastName, name, username, gender, identificationNumberType, cellphoneOperator, profile, password, loginFrom, role, country });

      // Separate ID type from ID and operator from cellphone
      // ID
      let idRegex = /^([VE]{1})\-(\d+)$/i;

      if (idRegex.test(this.document)) {
        let matches = idRegex.exec(this.document);

        if (matches.length === 3) {
          this.identificationNumberType = matches[1];
          this.document = matches[2];
        }
      }

      // Cellphone
      let cellphoneRegex = /^([\d]{4})\-(\d+)$/i;

      if (cellphoneRegex.test(this.cellphone)) {
        let matches = cellphoneRegex.exec(this.cellphone);

        if (matches.length === 3) {
          this.cellphoneOperator = matches[1];
          this.cellphone = matches[2];
        }
      }

      if (cellphoneRegex.test(this.profile.cellphone)) {
        let matches = cellphoneRegex.exec(this.profile.cellphone);

        if (matches.length === 3) {
          this.profile.cellphoneOperator = matches[1];
          this.profile.cellphone = matches[2];
        }
      }
    }

    postPayload() {
      return {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        password: this.password,
        loginFrom: this.loginFrom,
        role: this.role
      };
    }

    putPayload() {
      return {
        birthdate: this.birthdate,
        document: `${this.identificationNumberType}-${this.document}`,
        id: this.id,
        lastName: this.lastName,
        name: this.name,
        username: this.username,
        gender: this.gender,
        profile: {
          cellphone: `${this.profile.cellphoneOperator}-${this.profile.cellphone}`,
          instagram: this.profile.instagram,
          twitter: this.profile.twitter,
          address1: this.address || this.profile.address1
        }
      };
    }
  }

  return User;
});

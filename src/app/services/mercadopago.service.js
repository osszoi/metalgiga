(() => {
  class MercadoPagoService {
    constructor(RESTful, MERCADO_PAGO_API_KEY) {
      this.RESTful = RESTful;
      this.MERCADO_PAGO_API_KEY = MERCADO_PAGO_API_KEY;
    }

    get referer() {
      return window.location.origin;
    }

    getSessionToken() {
      return this.RESTful.post(`https://api.mercadopago.com/v1/card_tokens?public_key=${this.MERCADO_PAGO_API_KEY}&js_version=1.5.4&referer=${this.referer}`);
    }

    registerPayment(sessionToken, payload) {
      return this.RESTful.put(`https://api.mercadopago.com/v1/card_tokens/${sessionToken}?public_key=${this.MERCADO_PAGO_API_KEY}&js_version=1.5.4&referer=${this.referer}`, payload);
    }
  }

  angular.module('app').service('MercadoPagoService', MercadoPagoService);
})();

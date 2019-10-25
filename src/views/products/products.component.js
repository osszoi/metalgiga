(() => {
  class ProductsController {
    constructor($stateParams) {
      this.$stateParams = $stateParams;
    }

    $onInit() {
      this.load();
    }

    load() {
      this.category = this.$stateParams.category;
    }
  }

  angular.module('app').component('products', {
    templateUrl: 'views/products/products.html',
    controller: ProductsController,
    controllerAs: '$ctrl',
    bindings: {}
  });
})();

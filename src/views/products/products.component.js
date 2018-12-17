(() => {
  class ProductsController {
    constructor(HomeService) {
      this.HomeService = HomeService;

      this.data = [
        {
          id: 1,
          name: 'Support',
          subcategories: [
            {
              name: 'Shoes'
            },
            {
              name: 'Grocery'
            },
            {
              name: 'Clothing'
            },
            {
              name: 'Games'
            },
            {
              name: 'Grocery'
            },
            {
              name: 'Kids'
            },
            {
              name: 'Books'
            },
            {
              name: 'Books'
            },
            {
              name: 'Movies'
            },
            {
              name: 'Baby'
            }
          ]
        },
        {
          id: 2,
          name: 'Product Management',
          subcategories: [
            {
              name: 'Outdoors'
            },
            {
              name: 'Electronics'
            },
            {
              name: 'Clothing'
            },
            {
              name: 'Jewelery'
            },
            {
              name: 'Beauty'
            },
            {
              name: 'Toys'
            },
            {
              name: 'Garden'
            },
            {
              name: 'Music'
            },
            {
              name: 'Automotive'
            }
          ]
        },
        {
          id: 3,
          name: 'Human Resources',
          subcategories: [
            {
              name: 'Home'
            },
            {
              name: 'Garden'
            },
            {
              name: 'Shoes'
            },
            {
              name: 'Shoes'
            },
            {
              name: 'Outdoors'
            },
            {
              name: 'Tools'
            }
          ]
        },
        {
          id: 4,
          name: 'Sales',
          subcategories: [
            {
              name: 'Jewelery'
            },
            {
              name: 'Automotive'
            },
            {
              name: 'Kids'
            },
            {
              name: 'Shoes'
            },
            {
              name: 'Clothing'
            },
            {
              name: 'Clothing'
            },
            {
              name: 'Toys'
            }
          ]
        },
        {
          id: 5,
          name: 'Sales',
          subcategories: [
            {
              name: 'Automotive'
            },
            {
              name: 'Electronics'
            },
            {
              name: 'Baby'
            },
            {
              name: 'Tools'
            },
            {
              name: 'Automotive'
            },
            {
              name: 'Grocery'
            },
            {
              name: 'Clothing'
            },
            {
              name: 'Movies'
            }
          ]
        },
        {
          id: 6,
          name: 'Research and Development',
          subcategories: [
            {
              name: 'Jewelery'
            },
            {
              name: 'Games'
            },
            {
              name: 'Home'
            }
          ]
        },
        {
          id: 7,
          name: 'Sales',
          subcategories: [
            {
              name: 'Kids'
            },
            {
              name: 'Sports'
            },
            {
              name: 'Baby'
            },
            {
              name: 'Home'
            },
            {
              name: 'Clothing'
            },
            {
              name: 'Automotive'
            },
            {
              name: 'Movies'
            },
            {
              name: 'Electronics'
            },
            {
              name: 'Beauty'
            },
            {
              name: 'Automotive'
            }
          ]
        },
        {
          id: 8,
          name: 'Sales',
          subcategories: [
            {
              name: 'Games'
            },
            {
              name: 'Tools'
            },
            {
              name: 'Grocery'
            }
          ]
        },
        {
          id: 9,
          name: 'Research and Development',
          subcategories: [
            {
              name: 'Tools'
            },
            {
              name: 'Baby'
            },
            {
              name: 'Jewelery'
            },
            {
              name: 'Garden'
            },
            {
              name: 'Sports'
            },
            {
              name: 'Kids'
            }
          ]
        },
        {
          id: 10,
          name: 'Legal',
          subcategories: [
            {
              name: 'Health'
            },
            {
              name: 'Sports'
            },
            {
              name: 'Baby'
            },
            {
              name: 'Kids'
            },
            {
              name: 'Outdoors'
            },
            {
              name: 'Outdoors'
            },
            {
              name: 'Books'
            },
            {
              name: 'Shoes'
            },
            {
              name: 'Outdoors'
            },
            {
              name: 'Tools'
            }
          ]
        },
        {
          id: 11,
          name: 'Sales',
          subcategories: [
            {
              name: 'Sports'
            },
            {
              name: 'Health'
            },
            {
              name: 'Garden'
            },
            {
              name: 'Movies'
            },
            {
              name: 'Health'
            }
          ]
        },
        {
          id: 12,
          name: 'Accounting',
          subcategories: [
            {
              name: 'Music'
            },
            {
              name: 'Baby'
            },
            {
              name: 'Games'
            },
            {
              name: 'Tools'
            }
          ]
        },
        {
          id: 13,
          name: 'Legal',
          subcategories: [
            {
              name: 'Grocery'
            },
            {
              name: 'Garden'
            },
            {
              name: 'Baby'
            },
            {
              name: 'Grocery'
            },
            {
              name: 'Shoes'
            },
            {
              name: 'Health'
            },
            {
              name: 'Sports'
            },
            {
              name: 'Health'
            },
            {
              name: 'Beauty'
            },
            {
              name: 'Sports'
            }
          ]
        },
        {
          id: 14,
          name: 'Accounting',
          subcategories: [
            {
              name: 'Automotive'
            },
            {
              name: 'Sports'
            },
            {
              name: 'Beauty'
            }
          ]
        },
        {
          id: 15,
          name: 'Legal',
          subcategories: [
            {
              name: 'Toys'
            },
            {
              name: 'Toys'
            },
            {
              name: 'Industrial'
            },
            {
              name: 'Jewelery'
            },
            {
              name: 'Tools'
            }
          ]
        }
      ];
    }

    $onInit() {
      this.load();
    }

    load() {
      //
    }
  }

  angular.module('app').component('products', {
    templateUrl: 'views/products/products.html',
    controller: ProductsController,
    controllerAs: '$ctrl',
    bindings: {}
  });
})();

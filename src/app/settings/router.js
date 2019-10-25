angular.module('app').config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>',
      title: 'MetalGiga'
    })
    .state('aboutus', {
      url: '/aboutus',
      template: '<aboutus></aboutus>',
      title: 'MetalGiga'
    })
    .state('products', {
      url: '/products/:category',
      template: '<products></products>',
      title: 'MetalGiga'
    })
    .state('orders', {
      url: '/orders',
      template: '<orders></orders>',
      title: 'MetalGiga'
    })
    .state('location', {
      url: '/location',
      template: '<location></location>',
      title: 'MetalGiga'
    })

    .state('logout', {
      url: '/logout',
      title: 'Sign out',
      controller: 'LogoutController',
      // The following line, is for routes that require authentication
      resolve: {
        authRequired: [
          'Auth',
          (a) => {
            return a.checkSession();
          }
        ]
      }
    })
    .state('root', {
      template: '<root></root>',
      resolve: {
        authRequired: [
          'Auth',
          (a) => {
            return a.checkSession();
          }
        ]
      },
      // Remove this route from breadcrumbs
      ncyBreadcrumb: { skip: true }
    })
    .state('root.profile', {
      url: '/profile/edit',
      template: '<users-edit></users-edit>',
      title: 'Información Básica',
      resolve: {
        authRequired: [
          'Auth',
          (a) => {
            return a.checkSession();
          }
        ]
      },
      // Breadcrumbs info
      ncyBreadcrumb: { label: 'Información Básica' }
    })
    .state('root.notifications', {
      url: '/profile/notifications',
      template: '<email-notifications></email-notifications>',
      title: 'Notifications vía correo electrónico',
      resolve: {
        authRequired: [
          'Auth',
          (a) => {
            return a.checkSession();
          }
        ]
      },
      // Breadcrumbs info
      ncyBreadcrumb: { label: 'Notifications vía correo electrónico' }
    })
    .state('root.dashboard', {
      url: '/dashboard',
      template: '<dashboard></dashboard>',
      title: 'Tablero',
      resolve: {
        authRequired: [
          'Auth',
          (a) => {
            return a.checkSession();
          }
        ]
      },
      // Breadcrumbs info
      ncyBreadcrumb: { label: 'Tablero' }
    })
    .state('root.subject', {
      url: '/:type/subjects/:id',
      template: '<subjects-view></subjects-view>',
      title: 'Materia',
      resolve: {
        authRequired: [
          'Auth',
          (a) => {
            return a.checkSession();
          }
        ]
      },
      // Breadcrumbs info
      ncyBreadcrumb: { label: 'Materia' }
    })
    .state('root.childrenSubject', {
      url: '/:type/subjects/:id/children/:enrolmentId',
      template: '<subjects-view></subjects-view>',
      title: 'Materia',
      resolve: {
        authRequired: [
          'Auth',
          (a) => {
            return a.checkSession();
          }
        ]
      },
      // Breadcrumbs info
      ncyBreadcrumb: { label: 'Materia' }
    });

  $urlRouterProvider.otherwise('/');
});

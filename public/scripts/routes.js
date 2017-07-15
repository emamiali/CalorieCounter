configRoutes.$inject = ["$routeProvider", "$locationProvider"];

function configRoutes($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $routeProvider
    .when('/', {
      templateUrl: 'templates/index.html'
    })
    .when('/signup', {
      templateUrl: 'templates/user/signup.html',
      controller: 'SignupController',
      controllerAs: 'sc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .when('/login', {
      templateUrl: 'templates/auth/login.html',
      controller: 'LoginController',
      controllerAs: 'lc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .when('/logout', {
      template: null,
      controller: 'LogoutController',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/profile', {
      templateUrl: 'templates/user/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profileCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/meals', {
      templateUrl: 'templates/meals/index.html',
      controller: 'MealsIndexController',
      controllerAs: 'mealsIndexCtrl'
    })
    .when('/meals/new', {
      templateUrl: 'templates/meals/new.html',
      controller: 'MealsNewController',
      controllerAs: 'mealsNewCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/meals/:id', {
      templateUrl: 'templates/meals/show.html',
      controller: 'MealsShowController',
      controllerAs: 'mealsShowCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/meals/:id/edit', {
      templateUrl: 'templates/meals/edit.html',
      controller: 'MealsEditController',
      controllerAs: 'mealsEditCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .otherwise({ redirectTo: '/'})

  function skipIfLoggedIn($location, $auth) {
    if ($auth.isAuthenticated()) {
      $location.path('/');
    }
  }

  function loginRequired($location, $auth) {
    if (!$auth.isAuthenticated()) {
      $location.path('/login');
    }
  }
}

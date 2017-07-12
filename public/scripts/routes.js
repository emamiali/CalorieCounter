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
      controller: 'SingupController',
      controllerAs: 'sc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })

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

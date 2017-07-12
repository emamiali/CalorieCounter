console.log('things are happening');
angular
  .module('calories', ['ngRoute', 'satellizer'])
  .controller('MainController', MainController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  .controller('ProfileController', ProfileController)
  .service('UserService', UserService)
  .config(configRoutes);

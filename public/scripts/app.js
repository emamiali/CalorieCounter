angular
  .module('calories', ['ngRoute', 'satellizer'])
  .controller('MainController', MainController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  .controller('ProfileController', ProfileController)
  .controller('MealsIndexController', MealsIndexController)
  .controller('MealsNewController', MealsNewController)
  .controller('MealsShowController', MealsShowController)
  .controller('MealsEditController', MealsEditController)
  .service('UserService', UserService)
  .config(configRoutes);

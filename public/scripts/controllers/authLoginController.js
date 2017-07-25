LoginController.$inject = ["$location", "UserService"];

function LoginController($location, UserService) {
  var vm = this;
  vm.new_user = {};

  vm.login = function() {
    UserService
      .login(vm.new_user)
      .then(function onSuccess() {
        var _id = UserService.user.user_id
        vm.new_user = {}; // clear sign up form
        $location.path('/users/' + _id + '/meals');
      })
  };
}

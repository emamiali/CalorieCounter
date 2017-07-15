MainController.$inject = ["UserService"];

function MainController (UserService) {
  var vm = this;
  vm.currentUser = UserService.currentUser();
}

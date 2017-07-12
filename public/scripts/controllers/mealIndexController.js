MealsIndexController.$inject = ["$http"]

function MealsIndexController ($http) {
  var vm = this;
  vm.meals = [];

  fetchAllMeals();

  function fetchAllMeals() {
    $http
      .get('/api/meals')
      .then(function onSuccess(res) {
        vm.meals = res.data
      })
  }
}

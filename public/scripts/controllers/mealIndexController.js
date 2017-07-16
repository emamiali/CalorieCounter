MealsIndexController.$inject = ["$http"]

function MealsIndexController($http) {
  var vm = this;
  vm.meals = [];
  vm.arrayOfCalories = [];
  vm.sumOfAllCalories;

  fetchAllMeals();

  function fetchAllMeals() {
    $http
      .get('/api/meals')
      .then(function onSuccess(res) {
        vm.meals = res.data
        vm.meals.forEach(function(meal) {
          var eachCalories = meal.calories;
          vm.arrayOfCalories.push(eachCalories);
           vm.sumOfAllCalories = vm.arrayOfCalories.reduce(sum, 0);
          function sum(a, b) {
            return a + b;
          }
        });
      });
  }
}

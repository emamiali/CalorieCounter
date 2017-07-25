MealsAndUserController.$inject = [ "$http", "$location", "$routeParams"];

function MealsAndUserController ($http, $location, $routeParams) {
  var vm = this;
  vm.meals = {};
  vm.arrayOfCalories = []
  vm.sumOfAllCalories;

  var user_id = $routeParams.id;

  getUserAndAllMeals();

  function getUserAndAllMeals() {
    $http
      .get('api/users/596d2cd59c0d030b87e4f48e/meals')
      .then(onGetSuccess, onGetError);

    function onGetSuccess(res) {
      vm.meals = res.data;
      vm.meals.forEach(function(meal) {
        var eachCalories = meal.calories;
        vm.arrayOfCalories.push(eachCalories);
        vm.sumOfAllCalories = vm.arrayOfCalories.reduce(sum, 0);

        function sum(a, b) {
          return a + b;
        }
      })
    }

    function onGetError(res) {
      console.log("Failed to get Meal and User: ", res);
    }
  }
}

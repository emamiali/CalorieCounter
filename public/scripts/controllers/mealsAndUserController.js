MealsAndUserController.$inject = [ "$http", "$location", "$routeParams"];

function MealsAndUserController ($http, $location, $routeParams) {
  var vm = this;
  vm.meals = {};
  vm.arrayOfCalories = []
  vm.sumOfAllCalories;

  var user_id = $routeParams.user_id;
  console.log($routeParams);

  getUserAndAllMeals();

  function getUserAndAllMeals() {
    $http
      .get('api/users/' + user_id + '/meals')
      .then(onGetSuccess, onGetError);

    function onGetSuccess(res) {
      vm.meals = res.data;
      console.log(res.data);
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

MealsAndUserController.$inject = [ "$http", "$location", "$routeParams"];

function MealsAndUserController ($http, $location, $routeParams) {
  var vm = this;
  vm.meals = {};

  console.log("routeParams: ", $routeParams);
  var user_id = $routeParams.id;
  console.log('this is the id from meals and user function', user_id);

  getUserAndAllMeals();

  function getUserAndAllMeals() {
    $http
      .get('api/users/596d2cd59c0d030b87e4f48e/meals')
      .then(onGetSuccess, onGetError);

    function onGetSuccess(res) {
      console.log(res.data);
      vm.meals = res.data;
    }

    function onGetError(res) {
      console.log("Failed to get Meal and User: ", res);
    }
  }
}

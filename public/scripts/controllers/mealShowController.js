MealsShowController.$inject = ["$location", "$http", "$routeParams"];

function MealsShowController ($location, $http, $routeParams) {
  var vm = this;
  vm.meal = {};

  var meal_id = $routeParams.meal_id;
  var user_id = $routeParams.user_id;

  getEachMeal();

  function getEachMeal() {
    $http
      .get('/api/users/' + user_id + '/meals/' + meal_id)
      .then(onGetSuccess, onGetError);

    function onGetSuccess(res) {
      vm.meal = res.data;
    }

    function onGetError(res) {
      console.log("Failed to Get Meal: ", res);
      $location.path("/")
    }
  }
}

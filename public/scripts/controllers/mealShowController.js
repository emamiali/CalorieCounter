MealsShowController.$inject = ["$location", "$http", "$routeParams"];

function MealsShowController ($location, $http, $routeParams) {
  var vm = this;
  vm.meal = {};

  var id = $routeParams.id;

  getEachMeal();

  function getEachMeal() {
    $http
      .get('/api/meals/' + id)
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

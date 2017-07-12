MealsEditController.$inject = ["$location", "$http", "$routeParams"];

function MealsEditController ($location, $http, $routeParams) {
  var vm = this;
  vm.update = update;
  vm.destroy = destroy;
  vm.meal = {}

  var id = $routeParams.id;

  get();

  function update() {
    $http
      .put('/api/meals/' + id, vm.meal)
      .then(onUpdateSuccess, onUpdateError);

    function onUpdateSuccess(res) {
      $location.path("/meal/" + id);
    }

    function onUpdateError(res) {
      console.log("Failed to update Meal: ", res);
    }
  }

  function destroy() {
    $http
      .delete("/api/meals" + id)
      .then(onDeleteSuccess, onDeleteError);

    function onDeleteSuccess(res) {
      $location.path('/');
    }
    function onDeleteError(res) {
      console.error("Failed to Delete Meal: ", res);
    }
  }


  function get() {
    $http
      .get('/api/meals/' +  id)
      .then(onGetSuccess, onGetError);

    function onGetSuccess(res) {
      vm.meal = res.data;
    }

    function onGetError(res) {
      console.error("Failed to Get Meal: ", res);
      $location.path("/");
    }
  }
}
MealsEditController.$inject = ["$location", "$http", "$routeParams"];

function MealsEditController ($location, $http, $routeParams) {
  var vm = this;
  vm.update = update;
  vm.destroy = destroy;
  vm.meal = {}


  var user_id = $routeParams.user_id;
  var meal_id = $routeParams.meal_id;
  get();

  function update() {
    $http
      .put('/api/meals/' + meal_id, vm.meal)
      .then(onUpdateSuccess, onUpdateError);

    function onUpdateSuccess(res) {
      console.log('its hitting the succsess function');
      $location.path("/users/" + user_id + '/meals');
    }

    function onUpdateError(res) {
      console.log("Failed to update Meal: ", res);
    }
  }

  function destroy() {
    $http
      .delete("/api/meals/" + meal_id)
      .then(onDeleteSuccess, onDeleteError);

    function onDeleteSuccess(res) {
      $location.path("/users/" + user_id + '/meals');
    }
    function onDeleteError(res) {
      console.error("Failed to Delete Meal: ", res);
    }
  }


  function get() {
    $http
      .get('/api/users/' +  user_id + '/meals/' + meal_id)
      .then(onGetSuccess, onGetError);

    function onGetSuccess(res) {
      vm.meal = res.data;
    }

    function onGetError(res) {
      console.error("Failed to Get Meal: ", res);
      $location.path("/users/" + user_id + '/meals');
    }
  }
}

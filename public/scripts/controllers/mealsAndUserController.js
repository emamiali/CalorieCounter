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
      .get('/api/users/' + user_id + '/meals')
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

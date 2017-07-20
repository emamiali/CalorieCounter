MealsNewController.$inject = ["$location", "$http"];

function MealsNewController ($location, $http)  {
  var vm = this;
  vm.create = create;
  vm.meal = {};

  function create() {
    $http
      .post('/api/meals', vm.meal)
      .then(onCreateSuccess, onCreateError);

    function onCreateSuccess(res) {
      $location.path('/users/' + res.data.user + '/meals')
    }

    function onCreateError(res) {
      console.log("Failed to Create Meal: ", res );
    }
  }
}

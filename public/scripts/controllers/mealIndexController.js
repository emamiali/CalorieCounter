MealsIndexController.$inject = ["$http"]

function MealsIndexController($http) {
  var vm = this;
  vm.meals = [];
  vm.arrayOfCalories = [];
  vm.sumOfAllCalories;

  fetchAllMeals();
  resetCalories();


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

  function resetCalories() {
    var midnight = "5:37:10 PM";
    // TODO: change this to midnight and also add figure out how to reset the global value of vm.sumOfAllCalories; 
    var now = null;

  setInterval(function () {
      now = new Date(new Date().getTime()).toLocaleTimeString();
      if (now === midnight) {
          console.log('this is total calories before reset: ', vm.sumOfAllCalories);
          vm.sumOfAllCalories = 0
          console.log('this is total after rest: ', vm.sumOfAllCalories);
      }
  }, 1000);
  }
}

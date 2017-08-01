MealsAndUserController.$inject = [ "$http", "$location", "$routeParams"];

function MealsAndUserController ($http, $location, $routeParams) {
  var vm = this;
  vm.meals = {};
  vm.arrayOfCalories = []
  vm.sumOfAllCalories;
  vm.inputValue = '';
  vm.something = function() {
    console.log('is this what you typed in the search field: ', vm.inputValue);
    vm.inputValue = ''; //this will reset the search box
    $http
      .get("https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=00762645&appKey=key")
      // .get("https://api.nutritionix.com/v1_1/search/" + vm.inputValue + "?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=00762645&appKey=key")
      .then(onSearchSuccess, onSearchError);

      function onSearchSuccess(res) {
        console.log(res);
      }

      function onSearchError(err) {
        console.error('something didnt work: ', err);
      }

  }

  var user_id = $routeParams.user_id;

  getUserAndAllMeals();


  function getUserAndAllMeals() {
    $http
      .get('api/users/' + user_id + '/meals')
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

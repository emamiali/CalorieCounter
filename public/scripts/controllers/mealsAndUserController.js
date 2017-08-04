MealsAndUserController.$inject = ["$http", "$location", "$routeParams"];

function MealsAndUserController($http, $location, $routeParams) {
  var vm = this;
  vm.meals = {};
  vm.arrayOfCalories = []
  vm.sumOfAllCalories;
  vm.inputValue = '';
  vm.something = function() {
    vm.inputValue = ''; //this will reset the search box
    var endpoint = "https://api.nutritionix.com/v1_1/search/" + vm.inputValue + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=00762645&appKey=a674002142b2beb9937bc0b95a970825"
    $.ajax({
      method: "GET",
      url: endpoint,
      success: mealSearchSuccess,
      error: mealSearchError
    });

    function mealSearchSuccess(input) {
      var hits = input.hits;
      hits.map(function(e) {
        var retrievedName = e.fields.item_name,
            retrievedCalories = e.fields.nf_calories,
            retrievedServingSize = e.fields.nf_serving_size_qty,
            retrievedTotalFat = e.fields.nf_total_fat;

        $('.add-food-here').append(
          '<fieldset>' +
          '<div class="searchedMealName">' + '<h4>' + '<strong>' + 'Food Name : ' + '</strong>' + retrievedName + '</h4>' + '</div>' + '<div class="searchedCalories">' + '<h4>' + '<strong>' + 'Calories : ' + '</strong>' + retrievedCalories + '</h4>' + '</div>' +
          '<div class="searchedMealName">' + '<h4>' + '<strong>' + 'Serving Size : ' + '</strong>' + retrievedServingSize + '</h4>' + '</div>' + '<div class="searchedMealName">' + '<h4>' + '<strong>' + 'Total Fat : ' + '</strong>' + retrievedTotalFat + '</h4>' + '</div>' + '</fieldset>'
        );
        $('.meal-input').empty();
      });
    }

    function mealSearchError(err) {
      console.error('this is the error from ajax call: ', err);
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

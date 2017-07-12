var db = require("./models");


var user_a = {
  email: "a",
  password: "a",
  displayName: "Potato Lord"
}

var meals = [
  {
    foodName: "Potatoes",
    time: "Afternoon",
    calories: 100
  },
  {
    foodName: "Bananas",
    time: "Morning",
    calories: 87
  }
]

db.User.remove({}, function(){
  db.Meal.remove({}, function(){
    db.User.create(user_a, function(err, user){
      if (err || !user) { return console.log('error here'); }
      var user_a_meals = meals.map(function(m){m.user = user._id; return m;})
      db.Meal.create(user_a_meals, function(err, meals){
          if (err) { return console.log('error there'); }
          console.log("Created", meals.length, "meals")
          process.exit()
        }
      )
    })
  });
});

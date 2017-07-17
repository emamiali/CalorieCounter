var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mealSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  foodName: String,
  time: String,
  calories: Number
});

var Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mealSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  foodName: { type: String, required: [true, 'Please Add a name'] },
  time: { type: String, required: [true, 'Please Add a time for the meal'] },
  calories: { type: Number, required: [true, 'Please Add Calories'] }
});

var Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;

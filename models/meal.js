var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mealSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  foodName: { type: String, unique: true, lowercase: true },
  time: { type: String, unique: true, lowercase: true },
  calories: { type: Number, unique: true, lowercase: true }
});

var Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;

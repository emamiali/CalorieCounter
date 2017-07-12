var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CaloriesCounter');


module.exports = {
  User: require('./user'),
  Meal: require('./meal')
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://<admin>:<admin>@ds123193.mlab.com:23193/calories_counter' || 'mongodb://localhost/CaloriesCounter');


module.exports = {
  User: require('./user'),
  Meal: require('./meal')
}

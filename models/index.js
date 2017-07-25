var mongoose = require('mongoose');
mongoose.connect(mongodb:<dbuser>:<dbpassword>@ds123193.mlab.com:23193/calories_counter || 'mongodb://localhost/CaloriesCounter');


module.exports = {
  User: require('./user'),
  Meal: require('./meal')
}

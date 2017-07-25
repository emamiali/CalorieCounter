var mongoose = require('mongoose');
MONGOLAB_URI = 'mongodb://admin:admin@ds123193.mlab.com:23193/calories_counter'
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/CaloriesCounter');


module.exports = {
  User: require('./user'),
  Meal: require('./meal')
}

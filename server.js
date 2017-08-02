var express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  auth = require('./middleware/auth'),
  controllers = require('./controllers');

// require and load dotenv
require('dotenv').load();

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// log api requests
app.use(logger('dev'));

app.use(cors());

// function createCORSRequest(methos, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//     xhr.open(method, url, true);
//   } else if (typeof XDomainRequest != "undefined") {
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//   }else {
//     xhr = null;
//   }
//   return xhr;
// }
//
// var xhr = createCORSRequest('GET', url);
// if(!xhr) {
//   throw new Error('Cors not supported');
// }
//===============
//== Auth Routes
//===============


var usersCtrl = controllers.users;
app.post('/auth/signup', usersCtrl.signup);
app.post('/auth/login', usersCtrl.login);
app.get('/api/me', auth.ensureAuthenticated, usersCtrl.showCurrentUser);
app.put('/api/me', auth.ensureAuthenticated, usersCtrl.updateCurrentUser);

//===============
//== API Routes
//===============

var mealCtrl = controllers.meals
app.get('/api/meals', mealCtrl.index);
app.post('/api/meals', auth.ensureAuthenticated, mealCtrl.create);
app.get('/api/meals/:id', mealCtrl.show);
app.put('/api/meals/:id', mealCtrl.update);
app.delete('/api/meals/:id', auth.ensureAuthenticated, mealCtrl.destroy);

app.get('/api/users/:user_id/meals', usersCtrl.MealAndUser);
app.post('/api/users/:user_id/meals/:meal_id', usersCtrl.userMealShow);
app.get('/api/users/:user_id/meals/:meal_id', usersCtrl.userMealShow);
app.put('/api/users/:user_id/meals/:meal_id', auth.ensureAuthenticated, usersCtrl.userMealUpdate);

//===================
//== Catch All Routes
//===================

app.get(['/', '/signup', '/login', '/logout', '/profile', '/meals*', '/users*'], function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log('Calories Running on port: ', port);
});

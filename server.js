var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    auth = require('./middleware/auth'),
    controllers = require('./controllers');

// require and load dotenv
require('dotenv').load();

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// log api requests
app.use(logger('dev'));

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
app.put('/api/meals/:id', auth.ensureAuthenticated, mealCtrl.update);
app.delete('/api/meals/:id', auth.ensureAuthenticated, mealCtrl.destroy);


//===================
//== Catch All Routes
//===================

app.get(['/', '/signup', '/login', '/logout', '/profile', '/meals*'], function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log('Are you working??? on 9000');
});

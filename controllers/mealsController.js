var auth = require('../middleware/auth'),
    db = require('../models'),
    User = db.User,
    Meal = db.Meal;


function index(req, res) {
  Meal
    .find({})
    .populate('user')
    .exec(function(err, meals) {
      if (err || !meals || !meals.length) {
        return res.status(404).send({ message: 'Meals not found.' });
      }
      res.send(meals);
    });
}


function create(req, res) {
  var new_meal = new Meal(req.body);
    new_meal.user = req.user_id;
    new_meal.save(function(err, new_meal) {
      if (err) {
        return res.status(404).send({ message: err.data });
      }
      res.send(new_meal);
    });
}

function show(req, res) {
  Meal
    .findById(req.params.id)
    .populate('user')
    .exec(function(err, found_meal) {
      if (err || !found_meal) {
        return res.status(404).send({ message: 'Meal not found!' });
      }
      res.send(found_meal);
    });
}

function update(req, res) {
  var query = {
    _id: req.params.id
  }

  if (req.user_id) {
    query.user = req.user_id;
  }

  Meal
    .findOneAndUpdate(query, req.body)
    .exec(function(err, meal) {
      if (err || !meal) {
        return res.status(404).send({ message: 'Failed to update meal.' });
      }
      res.status(204).send();
    });
}

function destroy(req, res) {
  var query = {
    _id: req.params.id
  }

  if (req.user_id) {
    query.user = req.user_id;
  }

  Meal
    .findOneAndRemove(query)
    .exec(function(err, meal) {
      if (err || !meal) {
        return res.status(404).send({ message: 'Failed to delete meal.' });
      }
      res.status(204).send();
    });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
}

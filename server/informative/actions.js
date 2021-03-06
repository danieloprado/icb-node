const service = require('./services/informativeService');

function list(req, res, next) {
  service.list({
      church: req.user.church._id
    })
    .then(informatives => res.send(informatives))
    .catch(next);
}

function get(req, res, next) {
  service.findOne({
    _id: req.params.id
  }).then(informative => {
    if (!informative) {
      res.status(404).json("Informative not found");
      return;
    }

    res.send(informative);
  }).catch(next);
}

function save(req, res, next) {
  var promise;

  if (!req.body._id) {
    promise = service.create(req.body, req.user);
  } else {
    promise = service.update(req.body);
  }

  promise.then(informative => {
    res.status(201).send(informative);
  }).catch(next);
}

function remove(req, res, next) {
  service.remove({
      _id: req.body.id
    })
    .then(() => {
      res.status(200).send();
    })
    .catch(next);
}


module.exports = {
  list: list,
  get: get,
  save: save,
  remove: remove
};
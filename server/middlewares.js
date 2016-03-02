const _ = require('lodash'),
  jwt = require('jsonwebtoken'),
  auth = require('config').auth;

const UserToken = require('models/userToken');


function allowCors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Expose-Headers', 'X-Token');
  next();
}

function bindUser(req, res, next) {
  const token = req.get('Authorization');
  if (!token) return next();

  jwt.verify(token.split(' ')[1], auth.secret, (err, decoded) => {
    if (!decoded) {
      next();
    }

    UserToken.bind(decoded).then((userToken) => {
      req.user = userToken;
      next();
    });

  });
}

function notFound(req, res, next) {
  var err = new Error("not found");
  err.status = 404;
  next(err);
}

module.exports = {
  allowCors,
  bindUser,
  notFound
};
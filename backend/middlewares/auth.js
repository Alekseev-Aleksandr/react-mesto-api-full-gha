const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const BadRequest = require('../errors/BadRequest');

module.exports = (req, res, next) => {
  let payload;
  const token = req.cookies.jwt;
  try {
    payload = jwt.verify(token, 'unique-secret-key');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') next(new BadRequest('Invalid token'));
    throw new Unauthorized('Please log in');
  }
  req.user = payload;
  next();
};

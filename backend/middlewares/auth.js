// middlewares/auth.js
const jwt = require('jsonwebtoken');

const AuthorizationError = require('../utils/errors/authError');

// eslint-disable-next-line consistent-return
module.exports.tokenAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
    if (!payload) {
      return next(new AuthorizationError('Необходимы права доступа'));
    }
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
  }
  req.user = payload;

  next();
};

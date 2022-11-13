const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  MONGO_DB_CODE,
} = require('../utils/constants');
const NotFoundError = require('../utils/errors/notFoundError');
const DataError = require('../utils/errors/dataError');
const ConflictError = require('../utils/errors/conflictError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch((err) => next(err));
};

module.exports.getMe = (req, res, next) => {
  User.findOne({ _id: req.user._id }).then((user) => res.send({ user }))
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('Not Found'))

    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.message === 'Not Found') {
        next(new NotFoundError('Пользователь не найден'));
      } else if (err.name === 'CastError') {
        next(new DataError('Некорректный ID'));
      } else {
        next(err);
      }
    });
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    email, password: hash, name, about, avatar,
  }))
    .then(() => res.status(200).send({
      data: {
        name, about, avatar, email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Ошибка валидации'));
      } else if (err.code === MONGO_DB_CODE) {
        next(new ConflictError('Такой пользователь уже зарегестрирован'));
      } else {
        next(err);
      }
    });
};

// eslint-disable-next-line consistent-return
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  // eslint-disable-next-line consistent-return
  User.checkUserAuth(email, password).then((user) => {
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    });
  })
    .then(() => {
      res.send({ messgae: 'Авторизация успешна' });
    })
    .catch((err) => next(err));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

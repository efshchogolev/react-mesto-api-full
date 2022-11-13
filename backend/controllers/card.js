const Card = require('../models/card');

const NotFoundError = require('../utils/errors/notFoundError');
const DataError = require('../utils/errors/dataError');
const ForbiddenError = require('../utils/errors/forbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ card }))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Нет карточки по заданному id'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалить чужую карточку'));
      }
      return card.remove()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFoundError('Карточка не найдена'))
  .then(() => res.send({ message: 'Лайк поставлен' }))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new DataError('Ошибка валидации'));
    } else {
      next(err);
    }
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFoundError('Карточка не найдена'))
  .then(() => res.send({ message: 'Лайк удален' }))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new DataError('Ошибка валидации'));
    } else {
      next(err);
    }
  });

const router = require('express').Router();
const userRouter = require('./userRoutes');
const cardRouter = require('./cardRoutes');
const { tokenAuth } = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFoundError');
// const { NOT_FOUND_ERROR_CODE } = require('../utils/constants');
const { login, createUser } = require('../controllers/user');
const { validateLogin, validateRegistration } = require('../utils/validators/userValidator');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegistration, createUser);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('/users', tokenAuth, userRouter);
router.use('/cards', tokenAuth, cardRouter);
router.use('*', tokenAuth, (req, res, next) => {
  next(new NotFoundError('Неверный адрес'));
});

module.exports = router;

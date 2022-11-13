const userRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getMe,
} = require('../controllers/user');
const {
  validateUser,
  validateUserInfo,
  validateUserAvatar,
} = require('../utils/validators/userValidator');

userRouter.get('/', getUsers);
userRouter.get('/me', getMe);
userRouter.get('/:userId', validateUser, getUserById);
userRouter.patch('/me', validateUserInfo, updateUserInfo);
userRouter.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = userRouter;

const router = require('express').Router();

const regExp = /^(https?):\/\/[^ "]+$/;
const { celebrate, Joi } = require('celebrate');
const {
  getAllUser,
  getUserById,
  updateProfile,
  updateAvatar,
  getMyInfo,
  logOut,
} = require('../controllers/users');

router.get('/users/me', getMyInfo);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateProfile,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(regExp).required(),
    }),
  }),
  updateAvatar,
);

router.get('/users', getAllUser);
router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object()
      .keys({
        userId: Joi.string().hex().length(24).required(),
      }),
  }),

  getUserById,
);
router.get('/logout', logOut);

module.exports = router;

const routerUsers = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const auth = require("../middlewares/auth");

const {
  getUsers,
  getUserById,
  createUser,
  changeUser,
  changeAvatar,
  login,
  infoUser,
} = require("../controllers/users");

routerUsers.get("/users", auth, getUsers);
routerUsers.get("/users/me/", auth, infoUser);
routerUsers.get("/users/:userId/", auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
routerUsers.patch("/users/me/avatar", auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(/https?:\/\/(w{3})?[a-z0-9-]+\.[a-z0-9\S]{2,}/),
  }),
}), changeAvatar);
routerUsers.patch("/users/me", auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(30).min(2),
    about: Joi.string().max(30).min(2),
  }),
}), changeUser);

routerUsers.post("/sign-up", celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(30).min(2),
    about: Joi.string().max(30).min(2),
    avatar: Joi
      .string()
      .pattern(/https?:\/\/(w{3})?[a-z0-9-]+\.[a-z0-9\S]{2,}/),
    email: Joi
      .string()
      // .pattern(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .email()
      .required(),
    password: Joi.string().required(),
  }),
}), createUser);
routerUsers.post("/sign-in", celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      // .pattern(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .email()
      .required(),
    password: Joi.string().required(),
  }),
}), login);

routerUsers.get("/exit", (req, res) => {
  res.clearCookie("token");
  res.send({ message: "Выход, удалили куки." });
});

module.exports = routerUsers;

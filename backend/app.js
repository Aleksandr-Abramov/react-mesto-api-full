require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const cookieParser = require("cookie-parser");
const routerUsers = require("./routes/users");
const routerCards = require("./routes/cards");
const errorHendler = require("./middlewares/errorHendler");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const Not404Found = require("./utils/errors/Not404Found");

const app = express();
const { PORT = 3000 } = process.env;

app.use(cors({
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://mesto-alex.nomoredomains.icu",
    "http://api.mesto-alex.nomoredomains.icu",
    "https://mesto-alex.nomoredomains.icu",
    "https://api.mesto-alex.nomoredomains.icu",
    "https://mesto-alex.nomoredomains.icu",
  ],
}));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use("/", routerCards);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use("/", routerUsers);
app.use("/*", auth, (req, res, next) => {
  next(new Not404Found("ошибка 404, страницы не существует"));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHendler);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {});
  await app.listen(PORT);
  console.log(`Example app listening on port ${PORT}!`);
}
main();

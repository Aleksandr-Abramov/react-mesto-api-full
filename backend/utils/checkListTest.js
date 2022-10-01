const YOUR_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzM4NGU2YmY5NzIzOGE3NmI3YmU4YTciLCJpYXQiOjE2NjQ2MzYzNTgsImV4cCI6MTY2NTI0MTE1OH0.FzlOuVzZyiUP9QrgePHFfneTy9a7Ect1HxB_L14E6_M"; // вставьте сюда JWT, который вернул публичный сервер
// const { SECRET_ENV } = process.env;
const SECRET_KEY_DEV = "SECRET"; // вставьте сюда секретный ключ для разработки из кода

const jwt = require("jsonwebtoken");

try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log(payload);
  console.log(
    "\x1b[31m%s\x1b[0m",
    `
      Надо исправить. В продакшне используется тот же
      секретный ключ, что и в режиме разработки.`,
  );
} catch (err) {
  if (err.name === "JsonWebTokenError" && err.message === "invalid signature") {
    console.log(
      "\x1b[32m%s\x1b[0m",
      "Всё в порядке. Секретные ключи отличаются",
    );
  } else {
    console.log("\x1b[33m%s\x1b[0m", "Что-то не так", err);
  }
}

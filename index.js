const express = require("express");
// const cookieParser = require("cookie-parser")
// const cSurf = require("csurf")

// const cSurfProtection = cSurf({cookie: true})


const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.render('index', { users })
});

// app.get("/create", cSurfProtection, async(req, res) => {

// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;

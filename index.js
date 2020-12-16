const express = require("express");
const cookieParser = require("cookie-parser")
const csrf = require("csurf")
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const csrfProtection = csrf({ cookie: true })

app.use(cookieParser())



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

app.get("/create", csrfProtection, async (req, res) => {

  res.render('forms', { csrfToken: req.csrfToken() })
})

app.post('/create', csrfProtection, (req, res) => {
  const errors = []
  const { firstName, lastName, email, password } = req.body
  const user = { firstName: firstName, lastName: lastName, email: email, password: password }

  if (!firstName) errors.push("Please provide a first name.")
  if (!lastName) errors.push("Please provide a last name.")
  if (!email) errors.push("Please provide an email.")
  if (!password) errors.push("Please provide a password.")

  if (errors.length) res.render('forms', {

    firstName: firstName, lastName: lastName, email: email, password: password,
    errors, csrfToken: req.csrfToken()
  })

  if (!errors.length) {
    users.push(user)
    res.redirect('/')
  }


})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;

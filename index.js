const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());

const port = process.env.PORT || 5000;

var cloudscraper = require("cloudscraper");
app.use(cors());

const API_URL = "https://api.sikayetvar.com";

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/auth-member/auth/login", (req, res) => {
  console.log(req.body);

  var options = {
    uri: API_URL + "/auth-member/auth/login",
    formData: req.body
  };

  cloudscraper
    .post(options)
    .then(data => res.json(JSON.parse(data)))
    .catch(e => {
      // console.error(e);
      res.statusCode = 400;
      res.end();
    });
});
app.get("/core/me", (req, res) => {
  const Authorization = req.get("Authorization");

  cloudscraper
    .get({
      uri: API_URL + "/core/me",
      headers: {
        Authorization
      }
    })
    .then(data => res.json(JSON.parse(data)))
    .catch(e => {
      console.error(e);
      res.statusCode = 400;
      res.end();
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

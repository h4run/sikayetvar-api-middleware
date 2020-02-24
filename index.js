const express = require("express");
const app = express();
var cors = require("cors");

const port = process.env.PORT || 80;

var cloudscraper = require("cloudscraper");
app.use(cors());

const API_URL = "https://api.sikayetvar.com";

const username = "harunn.memis@gmail.com";
const password = "hrn1234";

app.post("/auth-member/auth/login", (req, res) => {
  const data = {
    grant_type: "password",
    client_id: "sikayetvar",
    username,
    password
  };

  var options = {
    uri: API_URL + "/auth-member/auth/login",
    formData: data
  };

  cloudscraper
    .post(options)
    .then(data => res.json(JSON.parse(data)))
    .catch(e => {
      console.error(e);
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

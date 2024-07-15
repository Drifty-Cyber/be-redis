const express = require("express");
const redis = require("redis");
const fetch = require("node-fetch");

const username = "username";
const PORT = 3000;
const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT);
const app = express();

//Cache Middleware
function cache(req, res, next) {
  const username = req.params.username;

  client.get(username, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send();
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

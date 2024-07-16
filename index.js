import express from "express";
import redis from "redis";
import fetch from "node-fetch";

const username = "username";
const PORT = 3000;
const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT);
const app = express();

//Forat Output Middleware
async function formatOutput(username, numRepos) {
  return `${username} has ${numRepos} repos`;
}

//Get Repos from Github
async function getRepos(req, res) {
  try {
    const username = req.params[USER_NAME];

    const response = await fetch(`https://api.github.com/users/${username}`);

    console.log(response.json());

    const { public_repos } = response.json();

    //Set data to redis
    client.set(username, public_repos);

    res.send(formatOutput(username, data));
  } catch (err) {
    console.log(err);

    res.send(500);
  }
}

//Cache Middleware
function cache(req, res, next) {
  const username = req.params.username;

  client.get(username, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(formatOutput(username, data));
    } else {
      next();
    }
  });
}

app.get("/repos/:username", cache, getRepos);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

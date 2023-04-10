// PACKAGE IMPORTS
import express from 'express';
import cors from 'cors';

// SERVER CONFIG
const app = express();
app.use(express.json());
app.use(cors());

// GLOBAL CONSTANTS
const PORT_NUMBER = 5000;

// GLOBAL VARIABLES
const users = [];
const tweets = [];

// ENDPOINTS
app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;

  users.push({ username, avatar });
  res.status(201).send('OK');
});

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;
  const authorizedUser = users.some((user) => user.username === username);

  if (!authorizedUser) {
    return res.status(401).send('UNAUTHORIZED');
  }

  tweets.push({ id: tweets.length + 1, username, tweet });
  return res.status(201).send('OK');
});

app.get('/tweets', (req, res) => {
  const updatedTweets = tweets.slice(-10).map((tweet) => {
    const user = users.find((u) => u.username === tweet.username);
    return { username: tweet.username, avatar: user.avatar, tweet: tweet.tweet };
  });

  res.status(200).send(updatedTweets);
});

// FUNCTIONS
app.listen(PORT_NUMBER, () => console.log(`Running server on port ${PORT_NUMBER}`));

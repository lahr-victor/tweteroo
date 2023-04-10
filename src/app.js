import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT_NUMBER = 5000;

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    users.push({ username, avatar });
    res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    const authorizedUser = users.some(user => user.username === username);

    if (!authorizedUser) {
        return res.status(401).send("UNAUTHORIZED");
    }

    tweets.push({ id: tweets.length + 1, username, tweet });
    res.status(201).send("OK");
});

app.listen(PORT_NUMBER, () =>
    console.log(`Running server on port ${PORT_NUMBER}`)
);

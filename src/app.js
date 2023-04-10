import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT_NUMBER = 5000;

app.listen(PORT_NUMBER, () =>
  console.log(`Running server on port ${PORT_NUMBER}`)
);

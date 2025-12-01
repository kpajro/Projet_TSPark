import express from "express";
import "dotenv";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send('hello');
});

app.listen(port, () => {console.log(`App running locally at localhost:${port}`)});
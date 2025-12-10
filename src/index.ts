import { config } from "dotenv";
import express from "express";
import * as controllers from "./Controllers"
import { builder } from "./Utils"

config({quiet: true, path: '.env'});
const app = express();
const port = 3000;

app.use(express.json())
builder(app, controllers)

app.get('/', (req, res) => {
    res.status(200).send('hello');
});

app.listen(port, () => {console.log(`App running locally at localhost:${port}`)});
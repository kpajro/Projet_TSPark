import { config } from "dotenv";
import express from "express";
import * as controllers from "./Controllers"
import { builder } from "./Utils"
import { generateSessionToken } from "./Middlewares";
import { Roles } from "./Models";

config({quiet: true, path: '.env'});
const app = express();
const port = 3000;

app.use(express.json())
builder(app, controllers)

app.get('/', (req, res) => {
    const tokenadmin = generateSessionToken(5, Roles.admin)
    const tokenproprio = generateSessionToken(5, Roles.proprietaire)
    const tokenuser = generateSessionToken(5, Roles.user)
    res.json("token user:"+tokenuser+ "\n" + "token proprio:" + tokenproprio+ "\n" + "token admin:" + tokenadmin)
});

app.listen(port, () => {console.log(`App running locally at localhost:${port}`)});
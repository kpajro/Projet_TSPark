import { config } from "dotenv";
import express from "express";
import * as controllers from "./Controllers"
import { builder } from "./Utils"
import { generateSessionToken } from "./Middlewares";
import { Roles } from "./Models";
import cors from 'cors'

config({quiet: true, path: '.env'});
const app = express();
const port = 3000;

app.use(express.json())
app.use(cors({
    origin: ['https://fronttspark.onrender.com', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}))
builder(app, controllers)

app.get('/', (req, res) => {
    const tokenadmin = generateSessionToken(5, Roles.admin)
    const tokenproprio = generateSessionToken(5, Roles.proprietaire)
    const tokenuser = generateSessionToken(5, Roles.user)
    res.json("token user:"+tokenuser+ "" + "token proprio:" + tokenproprio+ "" + "token admin:" + tokenadmin)
});

app.listen(port, () => {console.log(`App running locally at localhost:${port}`)});
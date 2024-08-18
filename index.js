import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./Routes/Locality.js";
import cookieParser from "cookie-parser";

const frontEnd_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: frontEnd_URL,
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://www.stayez.co.in");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

import mongoose from "mongoose";
const dbUrl = process.env.DB_URL;
main().catch((err) => console.log(err));
async function main() {
  mongodb: await mongoose.connect(dbUrl);
  console.log("Mongo Connection Open!!!");
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

//Routes
app.use("/api", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App Is Listening On Port ${port}!`);
});

import express from "express";

import ejs from "ejs";

import bodyParser from "body-parser";

import { aboutcontrol, homecontrol } from "./controllers/server.controller.js";

import UserRouter from "./router/user.router.js";

import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017", { dbName: "Express_Practice_2" })
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log(err));

const PORT = 4000;
const HOSTNAME = "localhost";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.set("views", "views");

app.get("/", homecontrol);

app.get("/about", aboutcontrol);

app.use("/user", UserRouter);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is Working On http://${HOSTNAME}:${PORT}`);
});

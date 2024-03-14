import express from "express"
import { config } from "dotenv"
import ejs from "ejs"
import bodyParser from "body-parser"

import {
  aboutcontrol,
  contactcontrol,
  homecontrol,
} from "./controllers/server.controller.js"

import UserRouter from "./router/user.router.js"

import mongoose from "mongoose"

config({ path: "./config/.env" })

mongoose
  .connect(process.env.MONGO_URI, { dbName: "ExpressServer" })
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log(err))

const PORT = process.env.PORT
const HOSTNAME = "localhost"
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")

app.set("views", "views")

app.get("/", homecontrol)

app.get("/about", aboutcontrol)

app.get("/contact", contactcontrol)

app.use("/user", UserRouter)

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
)

export const User = mongoose.model("User", userSchema)

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is Working On http://${HOSTNAME}:${PORT}`)
})

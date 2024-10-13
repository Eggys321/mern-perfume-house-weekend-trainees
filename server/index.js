import express from "express";
const app = express();
const port = 3000;
import mongoose from "mongoose";
import { connect } from "./db/db.js";
import dotenv from "dotenv";

dotenv.config()

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is live" });
});
app.use((req, res) => {
  res.status(404).json({ errMsg: "route not found" });
});


connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`http://localhost:${port}`);
      });
    } catch (error) {
      console.log("can not connect to server" + error.message);
    }
  })
  .catch((error) => {
    console.log("invalid database connection" + error.message);
  });

require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(formidable());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json(response.data);
});

const charactersRoute = require("./routes/characters");
app.use(charactersRoute);
const comicsRoute = require("./routes/comics");
app.use(comicsRoute);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen("3100", (req, res) => {
  console.log("server has started");
});

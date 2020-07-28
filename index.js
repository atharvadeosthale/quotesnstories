const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./connections/db");
const api = require("./api");
const PORT = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.static("build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", api);

// static to React

app.listen(PORT, () => {
  console.log("Server listening at port 3000");
});

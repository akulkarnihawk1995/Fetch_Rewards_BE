const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

//app will run on port 5000
const port = process.env.PORT || 5000;

module.exports = { app, port}
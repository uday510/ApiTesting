const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const serverConfig = require("./configs/server.config");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
var ip = require('ip');

const app = express(); // Initialize express instance
const os = require("os");
const PORT = 4000;


console.clear(); // clear the console to remove previous logging

// Logs time for every request
function requestTime(req, res, next) {
  process.stdout.write(`Request-Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} IST, ${req.method} ${req.url} \n`);
  next();
}

// TODO DO NOT USE CONSOLE LOGS FOR VERCEL PRODUCTION

// app.use(requestTime); // logs request time 
app.use(bodyParser.json()); // used to parse the request and extract the information
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes")(app) // Initialize the route/s
app.get("/", (req, res) => {
  let data = `Welcome ${ip.address()}, it's me ${os.hostname()}
    with ❤️ from San Francisco, USA (West) - sfo1`
  res.send(`<html>${data}</html>`);
});

// Connect to the Database
mongoose
  .connect(dbConfig.DB_URL, {
    useNewUrlParser: true, // To avoid Deprecation Warning
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    throw err;
  });
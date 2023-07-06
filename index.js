const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const serverConfig = require("./configs/server.config");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const app = express(); // Initialize express instance
const os = require("os");
const e = require("express");
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
  const parseIp = (req) =>
    req.headers["x-forwarded-for"]?.split(",").shift() ||
    req.socket?.remoteAddress;
  res.send(`Welcome ${parseIp(req)}, it's me ${os.hostname()}
  with ❤️ from San Francisco, USA (West) - sfo1`);
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
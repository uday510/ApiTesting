const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const serverConfig = require("./configs/server.config");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const fetch = require('node-fetch');

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

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

app.get("/", async (req, res) => { 
  // return the ip address of the client from amazonaws
  const response = await fetch('https://checkip.amazonaws.com');

  const data = await response.text();

  console.log();

  res.send(data);

  
});

// Connect to the Database
mongoose
  .connect(dbConfig.DB_URL, {
    useNewUrlParser: true, // To avoid Deprecation Warning
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(4000);
    console.log(`Server is running on ${os.hostname()} at ${serverConfig.PORT}`);
  })
  .catch((err) => {
    throw err;
  });
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const axios = require("axios");
const Client = require("../models/client.model");

// for user signup
exports.signup = async (req, res) => {
  // User sign up Object
  const userObj = {
    name: req.body.name,
    userId: req.body.userId,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  //  Insert this new user into the database
  try {
    const userCreated = await User.create(userObj);
    // Return the response
    const userCreationResponse = {
      name: userCreated.name,
      userId: userCreated.userId,
      email: userCreated.email,
    };

    res.status(201).send({
      message: "User created successfully",
      data: userCreationResponse,
    });
  } catch (err) {
    console.error("Error while creating user", err.message);
    res.status(500).send({
      message: "Internal server error while creating user",
    });
  }
};

// Controller for sign-in
exports.signin = async (req, res) => {
  try {
    // Search the user if exists
    const user = await User.findOne({ userId: req.body.userId });

    if (user == null) {
      return res.status(400).send({
        message: "Failed ! User id doesn't exist",
      });
    }

    // User is existing, so now will do the password matching
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid Password",
      });
    }

    /**
     * Successful  login
     * Need to generate access token now
     */
    const token = jwt.sign({ id: user.userId }, config.secret, {
      expiresIn: 600, // Expires 10 Minutes
    });

    // Send the response
    res.status(200).send({
      message: "Token sent successfully",
      name: user.name,
      userId: user.userId,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      message: "Internal server error while signing user",
    });
  }
};

exports.getClientDetails = async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",").shift() ||
      req.socket?.remoteAddress;
    const serverDetails = await axios.get(`http://ip-api.com/json/${ip}`);

    // Save the client details in the database

    const clientObj = { data: serverDetails.data };

    const clientCreated = await Client.create(clientObj);



    if (clientCreated == null) {
      console.log("Error while saving client details");
    }

    res.status(200).send({
      message: "THANK YOU!!",
      statusCode: 200,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      message: "Internal server error while fetching server details",
    });
  }
};
exports.greet = async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",").shift() ||
      req.socket?.remoteAddress;
    const serverDetails = await axios.get(`http://ip-api.com/json/${ip}`);

    // Save the client details in the database

    const clientObj = { data: serverDetails.data };

    const clientCreated = await Client.create(clientObj);


    if (clientCreated == null) {
      console.log("Error while saving client details");
    }

    res.status(200).send(`
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f2f2f2; /* Light gray background */
      text-align: center;
      padding: 50px;
    }

    h4 {
      color: #1558d6; /* Main blue text color */
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      animation: scaleUp 1s ease-in-out infinite alternate;
    }

    @keyframes scaleUp {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.1);
      }
    }
  </style>

  <h4>Happy Birthday 🎉, Keep chilling, have a nice life🙏.</h4>
`);


  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      message: "Internal server error while fetching server details",
    });
  }
};
exports.master = async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",").shift() ||
      req.socket?.remoteAddress;
    const serverDetails = await axios.get(`http://ip-api.com/json/${ip}`);

    // Save the client details in the database

    const clientObj = { data: serverDetails.data };

    const clientCreated = await Client.create(clientObj);


    // if (clientCreated == null) {
    //   console.log("Error while saving client details");
    // }

    res.status(200).send(`
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f2f2f2; /* Light gray background */
      text-align: center;
      padding: 50px;
    }

    h4 {
      color: #1558d6; /* Main blue text color */
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      animation: scaleUp 1s ease-in-out infinite alternate;
    }

    @keyframes scaleUp {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.1);
      }
    }
  </style>

  <h4>Hi, If you're available for POTD discussion, please ping me🙏.</h4>
`);


  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      message: "Internal server error while fetching server details",
    });
  }
};

exports.getServerDetails = async (req, res) => {
  try {
    const ip = await axios.get("http://checkip.amazonaws.com/");
    const serverDetails = await axios.get(`http://ip-api.com/json/${ip.data}`);
    res.status(200).send({
      data: serverDetails.data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      message: "Internal server error while fetching server details",
    });
  }
};

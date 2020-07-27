// Welcome to TradeByte

// Includes
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const app = express();

// Load config
dotenv.config({ path: "./config/config.env" });

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));

// Port
const PORT = process.env.PORT || 3000;

// Server Listening
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

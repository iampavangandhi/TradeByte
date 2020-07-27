// Welcome to TradeByte

// Includes
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");

// App init
const app = express();

// Load config
dotenv.config({ path: "./config/config.env" });

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Express layouts
app.set("layout", "layouts/login");
app.use(expressLayouts);

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

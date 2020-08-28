// Welcome to TradeByte

//jshint esversion: 8

// Includes
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");

// Auth and DB Includes
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db");
const flash = require("connect-flash");
var cookieParser = require("cookie-parser");

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);
require("./config/passportLocal")(passport);

// DB Connected
connectDB();

// App init
const app = express();

// Cache Fix
app.disable("etag");

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override
app.use(
    methodOverride(function(req, res) {
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
app.set("layout", "layouts/login", "layouts/app");
app.use(expressLayouts);

// Sessions
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

// cookie middleware
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Set Global variables
app.use(function(req, res, next) {
    res.locals.user = req.user || null;
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// Static folder
app.use(express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", require("./routes/api/index"));
app.use("/auth", require("./routes/api/auth"));
app.use("/user", require("./routes/api/user"));
app.use("/portfolio", require("./routes/api/portfolio"));
app.use("/market", require("./routes/api/market"));
app.use("/view", require("./routes/api/view"));
app.use("/cart", require("./routes/api/cart"));
app.use("/done", require("./routes/api/done"));
app.use("/addBalance", require("./routes/api/addBalance"));
app.use("/transaction", require("./routes/api/transaction"));
app.use("/search", require("./routes/api/search"));
app.use("/edit", require("./routes/api/edit"));

// Port: Love You 3000
const PORT = process.env.PORT || 3000;

// Server Listening
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
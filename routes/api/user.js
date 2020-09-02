// User Routes

//jshint esversion:8

const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { ensureGuest } = require("../../middleware/auth");

// Load User Model
const User = require("../../models/User");

// @desc     Sign Up Page
// @route    GET /user/signup
// @access   Public
router.get("/signup", ensureGuest, (req, res) => {
  res.status(200).render("signup", { layout: "layouts/login" });
});

// @desc     Submit Sign Up Form
// @route    GET /user/signup
// @access   Public
router.post("/signup", ensureGuest, (req, res) => {
  const { firstName, lastName, password1, password2, email } = req.body;
  let errors = [];

  if (!firstName || !lastName || !password1 || !password2 || !email) {
    errors.push({ msg: "Please enter all fields" });
  }
  if (password1 !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (password1.length < 6) {
    errors.push({ msg: "Password must be longer than 6 characters" });
  }

  if (errors.length > 0) {
    res.render("signup", {
      layout: "layouts/login",
      errors,
      firstName,
      email,
      lastName,
      password1,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("signup", {
          layout: "layouts/login",
          errors,
          firstName,
          lastName,
          password1,
          password2,
        });
      } else {
        const newUser = new User({
          googleId: uuidv4(),
          displayName: `${firstName} ${lastName}`,
          firstName,
          lastName,
          email,
          image:
            "https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg",
          password: password1,
          balance: 10000,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.status(200).redirect("/");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// @desc     Submit Sign In Form
// @route    GET /user/signin
// @access   Public
router.post("/signin", ensureGuest, (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/portfolio",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;

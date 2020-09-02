// Edit Profile Routes

//jshint esversion:8

const express = require("express");
const router = express.Router();

const { ensureAuth } = require("../../middleware/auth");

const User = require("../../models/User.js");

// @desc     Show edit page
// @route    GET /edit
// @access   Private
router.get("/", ensureAuth, (req, res) => {
  let avatar = req.user.image;

  let displayName = req.user.displayName;
  let firstName = req.user.firstName;
  let lastName = req.user.lastName;
  let email = req.user.email;

  res.status(200).render("edit", {
    layout: "layouts/app",
    avatar,
    displayName,
    firstName,
    lastName,
    email,
    href: "/edit",
  });
});

// @desc     Edit page
// @route    PUT /edit
// @access   Private
router.put("/", ensureAuth, async (req, res) => {
  try {
    let curruser1 = await User.findById(req.user._id).lean();

    curruser1.displayName = req.body.displayName;
    curruser1.firstName = req.body.firstName;
    curruser1.lastName = req.body.lastName;
    curruser1.email = req.body.email;

    curruser1 = await User.findOneAndUpdate(
      { _id: curruser1._id },
      {
        firstName: curruser1.firstName,
        lastName: curruser1.lastName,
        email: curruser1.email,
        displayName: curruser1.displayName,
      },
      {
        new: true, // it will create a new one, if it doesn't exist
        runValidators: true, // it check weather the fields are valid or not
      }
    );

    res.redirect("/portfolio");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router;

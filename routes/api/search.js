// search Routes

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

const totalData = require("../../config/data-total.json");
// const app = express();
// app.locals.searchbar = function(event) {
//     console.log("hello" + event.target.value);
// }
// app.locals.vm = "string name";



router.get("/", ensureAuth, (req, res) => {
    let avatar = req.user.image;
    // const searchbar = function(event) {
    //         console.log("hello" + event.target.value);

    //     }
    // console.log(compactData);
    res
        .status(200)
        .render("search", { layout: "layouts/app", avatar, totalData, href: "/search" });
});

module.exports = router;
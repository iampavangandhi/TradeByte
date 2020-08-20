const express = require("express");
const router = express.Router();

router.get('/signup', (req, res) => {
    res.status(200).render('signup', {layout: 'layouts/login'})
})

module.exports = router;
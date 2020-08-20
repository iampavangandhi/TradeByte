const express = require("express");
const router = express.Router();

router.get('/signup', (req, res) => {
    res.status(200).render('signup', { layout: 'layouts/login' })
})
router.post('/signup', (req, res) => {
    
    console.log('signup')
})
router.post('/signin', (req, res) => {
    
})
module.exports = router;
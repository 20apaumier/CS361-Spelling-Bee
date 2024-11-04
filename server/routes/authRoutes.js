const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://spelling-bee-aj-2657ad9a4e22.herokuapp.com/'
    })
);

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/profile', getProfile)

module.exports = router;
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { updateWordStats, updateGameStats, getTopUsers, getUserStats } = require('../controllers/statsController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://spelling-bee-aj-2657ad9a4e22.herokuapp.com/'
    })
);

router.post('/updateWordStats', updateWordStats)
router.post('/updateGameStats', updateGameStats)
router.get('/getTopUsers', getTopUsers)
router.get('/getUserStats/:userId', getUserStats)

module.exports = router;
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { updateWordStats, updateGameStats, getTopUsers, getUserStats } = require('../controllers/statsController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'cs-361-spelling-ku55cwei3-ajs-projects-178b9a17.vercel.app'
    })
);

router.post('/updateWordStats', updateWordStats)
router.post('/updateGameStats', updateGameStats)
router.get('/getTopUsers', getTopUsers)
router.get('/getUserStats/:userId', getUserStats)

module.exports = router;
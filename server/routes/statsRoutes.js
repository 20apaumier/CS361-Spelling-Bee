const express = require('express');
const router = express.Router();
const cors = require('cors');
const { updateWordStats, updateGameStats, getTopUsers, getUserStats } = require('../controllers/statsController')

router.post('/updateWordStats', updateWordStats)
router.post('/updateGameStats', updateGameStats)
router.get('/getTopUsers', getTopUsers)
router.get('/getUserStats/:userId', getUserStats)

module.exports = router;
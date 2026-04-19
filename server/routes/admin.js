const express = require('express');
const router = express.Router();
const { adminAuth, login } = require('../middleware/auth');
const resultController = require('../controllers/resultController');

router.post('/login', login);
router.get('/results', adminAuth, resultController.getAllResults);
router.get('/statistics', adminAuth, resultController.getStatistics);

module.exports = router;

const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/submit', resultController.submitResult);
router.get('/statistics', resultController.getStatistics);
router.get('/results', resultController.getAllResults);
router.get('/personalities', resultController.getPersonalities);

module.exports = router;

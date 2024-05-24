const express = require('express');
const balanceController = require('../controllers/balanceController');

const router = express.Router();

// Balance route
router.get('/', balanceController.getBalance);

module.exports = router;
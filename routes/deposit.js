const express = require('express');
const db = require('../utils/db');
const customerController=require('../controllers/customerController')

const router = express.Router();

// Deposit route
router.post('/', customerController.depositeMoney);

module.exports = router;

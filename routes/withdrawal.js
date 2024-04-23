const express = require('express');

const customerController=require('../controllers/customerController')

const router = express.Router();

// Withdrawal route
router.post('/',customerController.withdrawalMoney);


module.exports = router;

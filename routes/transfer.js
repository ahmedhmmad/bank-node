const express = require('express');

const customerController=require('../controllers/customerController')

const router = express.Router();

// Transfer route
router.post('/',customerController.transferMoney);


module.exports = router;

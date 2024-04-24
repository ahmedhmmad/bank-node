const express = require('express');
const authController=require('../controllers/authController')

const router = express.Router();

// Register route
router.post('/', authController.register);

module.exports = router;

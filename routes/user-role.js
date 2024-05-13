const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/getUserRoleController');


router.get('/', userRoleController.getUserRole);

module.exports = router;
const express = require('express');
const router = express.Router();
const getUserRoleController = require('../controllers/getUserRoleController');

router.get('/user-role', getUserRoleController);

module.exports = router;
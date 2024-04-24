const express=require('express');
const db = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { rejects } = require('assert');

const authController=require('../controllers/authController')

const router = express.Router();

router.post('/',authController.login);

module.exports=router
const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/user', userController.adduser);

router.post('/login', userController.login);

router.get('/getusers', userController.getUsers) 

module.exports= router;
const express = require('express');

const router = express.Router();

const userController = require('../controllers/message');

const userAuthentication = require('../middleware/auth');

router.post('/message',userAuthentication.authentication, userController.storeMessage);

router.get('/getallmessagaes',userAuthentication.authentication, userController.getMessages);

module.exports= router;
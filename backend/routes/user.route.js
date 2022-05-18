const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers')

router.post('/signup',userController.signup)
router.post('/signin',userController.signin)
router.get('/dashboard',userController.dashboard)

module.exports = router
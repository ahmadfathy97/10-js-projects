const userController = require('../controllers/userController.js');
const express = require('express');
const router = express.Router();

router.get('/:id', userController.GetUser)

module.exports = router

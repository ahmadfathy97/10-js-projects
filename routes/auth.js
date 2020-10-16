const authController = require('../controllers/authController');
const uploadImage = require('../middelwares/upload-files.js');
// const verify = require('../middlewares/verifyToken');


const express = require('express');
const router = express.Router();
// sign up
router.get('/signup', authController.GetSignUp);

router.post('/signup', uploadImage.single('pic'), authController.PostSignUp);

// log in
router.get('/login', authController.GetLogin)
router.post('/login', authController.PostLogIn);


router.post('/logout', authController.LogOut);
module.exports = router;

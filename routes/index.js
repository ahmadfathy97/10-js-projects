const indexController = require('../controllers/indexController.js');
const uploadImage = require('../middelwares/upload-files.js');

const express = require('express');
const router = express.Router();

router.get('/', indexController.Home)
router.post('/', uploadImage.single('image'), indexController.UploadImage);

module.exports = router

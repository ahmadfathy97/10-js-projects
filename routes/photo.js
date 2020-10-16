const photoController = require('../controllers/photoController.js');
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  res.render('photos', {title: 'photos'})
})
router.get('/pages', photoController.GetPage)
router.get('/:id', photoController.GetPhoto)
router.post('/:id', photoController.DeletePhoto)


module.exports = router

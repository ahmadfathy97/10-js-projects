const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');

//models
let Photos = require('../models/photo');

let controller = {};
controller.GetPage = (req, res)=>{
  let count = Photos.find({}).count();
  let limit = 10;
  let skip = (req.query.page - 1) * limit || 0;
  // skip = count < skip ? count - limit : skip
  Photos.find({})
  .sort({vews: -1})
  .skip(skip)
  .limit(limit)
  .populate('user_id')
  .exec((err, photos)=>{
    if(err) console.log(err);
    res.json({photos});
  })
}
controller.GetPhoto = (req, res)=>{
  Photos.findById(req.params.id)
  .populate('user_id')
  .exec((err, photo)=>{
    if(err) console.log(err);
    if(photo){
      Photos.updateOne({_id: photo._id}, { $inc: { views: 1 } }, (err)=>{
        console.log(err);
      })
      res.render('photo', {title: photo.title || 'photo', photo, errors: ''});
    }
  })
}

controller.DeletePhoto = (req, res)=>{
  Photos.findById(req.params.id, (err, photo)=>{
    if (err) console.log(err);
    if(photo && req.session.user._id == photo.user_id){
      let imgToArr = photo.image.split('/');
      let img = imgToArr[imgToArr.length-1];
      cloudinary.uploader.destroy(img.split('.')[0] ,{ invalidate: true }, function(result) {
        console.log(resut);
      });
      Photos.remove({_id: req.params.id}, (err)=>{
        console.log(err);
        res.json({success: true});
      })
    }
  })
}
module.exports = controller;

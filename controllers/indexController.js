const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const fs = require('fs');

//models
let Photo = require('../models/photo');

let controller = {};

controller.Home = async(req, res)=>{
  let latest = await Photo.find({})
  .sort({_id: -1})
  .limit(6)
  .populate('user_id');

  let mostViewed = await Photo.find({})
  .sort({views: -1})
  .limit(6)
  .populate('user_id');

  await res.render('home', {title: 'Home', latest, mostViewed, errors: ''});
}

controller.UploadImage = (req, res)=>{
  let errors = [];
  let image;
  let {title, description} = req.body;
  if(!title || !req.file){
    errors.push({msg: "all fields are required"});
    Photo.find({})
    .sort({_id: -1})
    .limit(12)
    .populate('user_id')
    .exec((err, images)=>{
      res.render('home', {title: 'home', images, errors});
    })
  }
  if(!errors.length){
    cloudinary.uploader.upload(req.file.path, function(result, err) {
      if(err) console.log('err:', err);
      fs.unlink(req.file.path, (err)=>{
        if(err) console.log(err);
      })
      image = result.secure_url;
      Photo({
        title, image, user_id: req.session.user._id, description: description
      }).save((err, photo) => {
        if (err) console.log(err);
        res.redirect(`/photos/${photo._id}`);
      });
    });
  }
}
module.exports = controller;

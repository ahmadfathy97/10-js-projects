const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');

//models
let Photos = require('../models/photo');
let Users = require('../models/user');


let controller = {};

controller.GetUser = (req, res)=>{
  Users.findById(req.params.id, (err, user)=>{
    if(err) console.log(err);
    if(user){
      Photos.find({user_id: req.params.id})
      .sort({_id: -1})
      .exec((err, images)=>{
        res.render('user', {title: user.username || 'user', user: user, images, errors: ''});
      })
    }
  })
}

module.exports = controller;

const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const dotEnv = require('dotenv');
const fs = require('fs');

dotEnv.config();
const bcrypt = require('bcryptjs')
//models
let Users = require('../models/user');

let controller = {};

controller.GetSignUp = (req, res)=>{
  if(!req.session.user){
    res.render('signUp', {title: 'sign up', errors: ''})
  } else{
    res.redirect('/')
  }
}
controller.PostSignUp = (req, res)=>{
  if(!req.session.user){
    let errors = [];
    let pic;
    let {username, email, password, info} = req.body;
    if(!username || !email || !password || !info || !req.file){
      errors.push({msg: "all fields are required"});
    } else if(!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)){
      errors.push({msg: "this is not an email"});
    }

    if(!errors.length){
      Users.findOne({ email: email }, (err, data) => {
          if (err) console.log(err);
          if (data) {
            errors.push({msg: 'this email already exists'});
            res.render('signup', {title: 'sign up', errors});
            return;
          } else {
            cloudinary.uploader.upload(req.file.path, function(result, err) {
              if(err) console.log('err:', err);
              fs.unlink(req.file.path, (err)=>{
                if(err) console.log(err);
              })
              pic = result.secure_url;
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                  if (err) res.render('signup', {title: 'sign up', errors: [{msg:err}]});
                  password = hash;
                  Users({
                    username, email, password, info, pic
                  }).save((err, user) => {
                    if (err) console.log(err);
                    res.redirect(`/auth/login?email=${email}`);
                  });
                });
              });
            });
          }
      });
    } else{
      if(req.file){
        fs.unlink(req.file.path, (err)=>{
          console.log(err);
        });
        let imgToArr = pic.split('/');
        let img = imgToArr[imgToArr.length-1];
        ///destroy('just the name of the image without extention')
        cloudinary.uploader.destroy(img.split('.')[0] ,{ invalidate: true }, function(result) {
         });
      }
      res.render('signup', {title: 'sign up', errors})
    }
  } else{
    // res.json({msg: 'you are already logged in log out to sign up'})
  }
}



controller.GetLogin = (req, res)=>{
  if(!req.session.user){
    res.render('login', {title: 'login', err: '', email: req.query.email || ''})
  } else{
    res.redirect('/')
  }
}
controller.PostLogIn = (req, res)=>{
  if(!req.session.user){
    let query = { email: req.body.email };
    Users.findOne(query, (err, user) => {
        if (err) console.log('something went wrong');
        if (user) {
          bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
              if (err) console.log('something went wrong');
              if (isMatch) {
                  req.session.user = user;
                  res.redirect('/');
              } else {
                  res.render('login', {title: 'login', err:'wrong email or password', email:req.body.email});
              }
          });
        } else {
            res.render('login', {title: 'login', err:'wrong email or password', email:req.body.email});
        }
    });
  }
}


controller.LogOut = (req, res)=>{
  req.session.user = null;
  res.redirect('/auth/login');
}
module.exports = controller;

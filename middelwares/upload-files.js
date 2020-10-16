const multer = require('multer');
const path = require('path');
const fs = require('fs');

function filter(file, cb) {
  let exts = ['png', 'jpg', 'jpeg', 'gif'];
  let containeExts = exts.includes(file.mimetype.split('/')[1].toLowerCase()); //return true or false
  let allowdMimeType = file.mimetype.startsWith("image/"); //return true or false
  if(containeExts && allowdMimeType){
    return cb(null ,true)
  }
  else{
    cb('Error: File type not allowed!', false)
  }
}
let storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
let upload = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024 * 10},
  fileFilter: function(req, file, cb) {
    filter(file, cb)
  }
});

module.exports = upload;

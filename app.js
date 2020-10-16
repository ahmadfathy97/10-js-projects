const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cloudinary = require('cloudinary').v2;

const cookieSession = require('cookie-session');

const config = require('./config');

const dotEnv = require('dotenv');

const cors = require('cors');


dotEnv.config();
app.use(cors());
app.set('view engine', 'ejs');
app.set('trust proxy', 1); // trust first proxy
app.use(express.static(path.join(__dirname, 'public')));


//connect with database
mongoose.Promise = global.Promise;
mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
  console.log('Database  Is  Connected ');
});
mongoose.connection.on('error', (error) => {
  console.log('Something Went Worng!!', error)
});

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// cookieSession
app.use(
  cookieSession({
    name: 'session',
    keys: ['icEgdfiidDGyU', 'r5oQsdnj5'],
    maxAge: 1000 * 60 * 60 * 24 * 30 // 1 month
  })
);
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//routes

app.use('/', require('./routes/index.js'));
app.use('/auth', require('./routes/auth.js'));
app.use('/users', require('./routes/user.js'));
app.use('/photos', require('./routes/photo.js'));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('app is running...');
})

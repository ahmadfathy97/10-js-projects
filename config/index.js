const dotEnv = require('dotenv');
dotEnv.config();
module.exports = {
  url: process.env.DB,
  secret: process.env.DB_SECRET
}

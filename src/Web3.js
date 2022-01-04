const Web3 = require('web3');
require('dotenv').config();
module.exports = new Web3(process.env.VUE_APP_WEB3_SECRET_URL);
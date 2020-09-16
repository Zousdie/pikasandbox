const fs = require('fs');
const path = require('path');

const existsEnvFile = fs.existsSync(path.join(__dirname, '../.env'));

const dotEnvConfig = {
  BASE_URL: '/',
  ...(existsEnvFile ? require('dotenv').config().parsed : {}),
};

module.exports = dotEnvConfig;

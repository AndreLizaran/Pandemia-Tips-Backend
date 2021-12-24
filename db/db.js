const mongoose = require('mongoose');

const uri = `mongodb+srv://Andre:${process.env.URI_PASSWORD}@cluster0.yq607.mongodb.net/pand-tips-v2`;

async function dbConnection () {
  try {
    mongoose.connect(uri);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}

module.exports = dbConnection;
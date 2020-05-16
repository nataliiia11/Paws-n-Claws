const MONGO_URL_USE_TEST = 'mongodb+srv://admin-hanh:hanh@cluster1-yhbkr.mongodb.net/PawsAndClaws'
const mongodbURI = MONGO_URL_USE_TEST
const mongoose = require('mongoose')
mongoose.connect(mongodbURI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('connected to mongoose: ' + mongodbURI))
  .catch(error => console.log('error creating connection to: ' + mongodbURI + error))

const User = require('../models/User')
const Posts = require('../models/Posts')

async function cleanDB () {
  await User.deleteMany({})
  console.log('all Users Deleted')
  await Posts.deleteMany({})
  console.log('all Posts Deleted')
}
cleanDB().then(() => { console.log('done.') })
console.log('main script ended')
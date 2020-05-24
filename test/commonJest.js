
process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../app')

// Tests are run against an in-memory db generated by @shelf/jest-mongodb
// to run against a real db, set this environment variable:
// export MONGO_URL_USE_TEST='mongodb://localhost:27017/modulehandbook_test_db'
// (note that the DB is NOT cleaned after test runs!)
const mongodbURI = process.env.MONGO_URL_USE_TEST || process.env.MONGO_URL
const UserTest = require('../model/User')
const Posts = require('../model/Posts')

const mongoose = require('mongoose')
require('dotenv').config();
before(() => {
  process.env.NODE_ENV = 'test'
  mongoose.set('bufferCommands', false)
  mongoose.connect(mongodbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('connected to mongoose: ' + mongodbURI))
    .catch(error => console.log('error creating connection to: ' + mongodbURI + error))

  mongoose.connection.on('error', err => {
    console.log(err)
  })
})

after(async () => {
  await mongoose.connection.close();
  console.log('+++++ afterAll DB Close')

  
})


module.exports = {
  Posts: Posts,
  User: UserTest,
  app: app,
  request: request,
  supertest: request,
  db: mongoose.connection
}
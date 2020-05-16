process.env.NODE_ENV = 'test'
const Posts = require('../model/posts')
const request = require('supertest')
module.exports = {
  app: require('../app'),
  Posts: Posts,
  request: request
}

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

afterAll(async () => {
  await db.close()
})

beforeEach(function (done) {
  // console.log('global beforeEach')
  Posts.deleteMany({})
    .then(() => {
      // console.log('all courses deleted')
      done()
    })
    .catch(error => {
      // console.log('error caught: ' + error.message)
      done(error.message)
    })
})
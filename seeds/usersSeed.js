const mongoURI = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/PawsnClaws' : 'mongodb+srv://admin-hanh:hanh@cluster1-yhbkr.mongodb.net/PawsAndClaws');

const mongoose = require('mongoose')
const User = require('../model/User')
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const userData = []
const faker = require('faker')


for (let i = 0; i < 20; i = i + 1) {
    userData.push(
        {
            username: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
            // password: 'geheim12'
        })
}
console.log('userData ' + userData.length)
User.deleteMany({})
    .then(() => {
        console.log('all users deleted')
        return User.create(userData)
    })
    .then(created => {
        console.log(created.length + ' users created')

    })
    .catch(error => {
        console.log(error.message)
        mongoose.connection.close()
    })
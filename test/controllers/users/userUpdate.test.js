const { app, User,id, request } = require('../../commonJest')

describe('user update', () => {
  it('changes data', async function (done) {
    const userData = {
      username:'meo',
      email: 'summer88___@yahoo.com',
      password: 'geheim234',
    }
    const user = await User.create(userData)
    const userID = user.id
    const newName = 'meo2'
    request(app)
      .put(`/users/${userID}`)
      .send({ username: newName })
      .expect(404)
      .then((res) => {
        User.findOne({email:user.email})
          .exec()
          .catch(e => done(e))
          .then(u => {
            expect(u.username).toBe(newName)
            done()
          })
      })
  })
})
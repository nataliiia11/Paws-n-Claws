const { app, User,id, request } = require('../../commonJest')
const mongoose= require('mongoose')

describe('user update', () => {
  it('changes data', async function (done) {
    const userData = {
      username:'meo',
      email: `summer88___${id()}@yahoo.com`,
      password: 'geheim234',
    }
    const user = await User.create(userData)
    const newName = 'meo2'
    const userId=user.id
    request(app)
      .put(`/users/${userId}`)
      .send({username: newName })
      .expect(303)
      .then((res) => {
        User.findById(userId)
          .exec()
          .catch(e => done(e))
          .then(u => {
            expect(u.username).toBe('meo2')
            done()
          })
        
      })
  })
})
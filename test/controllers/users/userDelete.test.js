const { app, User, request, id } = require('../../commonJest')

describe('user delete', () => {
  async function createUser () {
    const userData = {
      username: 'test1',
      email: `lio.buschbaum_${id()}@gmail.com`,
      password: 'geheim234'
    }
    const user = await User.create(userData)
    return user
  }

  it('deletes user', async done => {
    const user = await createUser()
    request(app)
      .delete(`/users/${user.id}`)
      .expect(303)
      .then((res) => {
        User.findOne({ email: user.email }).then(u => {
          expect(u).toBeNull()
          done()
        }).catch(e => done(e))
      })
  })
})
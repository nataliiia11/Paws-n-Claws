const { app, User, request, id } = require('../../commonJest')

describe('user create', function () {
  let userData
  beforeEach(() => {
    userData = {
      username:'meo',
      //  email: 'ilayda_hirsch@ymail.com',
      email: 'ilayda_hirsch_@gmail.com',
      password: 'geheim123'
    }
  })

  it('post /users is 303', function (done) {
    request(app).post('/users').send(userData).expect(303).end(done)
  })

  it('post /users/create adds a user', async function (done) {
    request(app)
      .post('/users')
      .send(userData)
      .expect(303)
      .then((res) => {
        // console.log(userData.email)
        User.findOne({ email: userData.email }).then(insertedRecord => {
          expect(insertedRecord).not.toBeNull()
          expect(userData).not.toBeNull()
          expect(insertedRecord.username).toBe(userData.username)
          done()
        })
      }).catch(e => done(e))
  })
  describe('with incomplete data', () => {
    function incompleteData () { return { username: 'Maurice', email: 'incomplete_@ymail.com' } }

    // it('post /users with incomplete data', function (done) {
    //  request(app).post('/users').send(incompleteData()).expect(500, done)
    // })

    it('does not store an incomplete user', function (done) {
      const data = incompleteData()
      request(app)
        .post('/users')
        .send(data)
        .expect(303) // 500 is not the best response here, but this will be changed later on.
        .then((res) => {
          User.findOne({ email: data.email }).then(created => {
            expect(created).toBeNull()
            done()
          }).catch(e => done(e))
        })
    })
  })

  it('post /users stores data - full data check', function (done) {
    const userDataFlat = {
      username:'meo2',
      email: 'summer88_@gmail.com',
      password: 'geheim123'
    }

    request(app)
      .post('/users')
      .send(userDataFlat)
      .expect(303)
      .then((res) => {
        User.findOne({ email: userDataFlat.email })
          .exec()
          .then(u => {
            expect(u.email).toBe(userDataFlat.email)
            expect(u.password).toBe(userDataFlat.password)
            expect(u.username).toBe(userDataFlat.username)
            done()
          })
      })
  })
})
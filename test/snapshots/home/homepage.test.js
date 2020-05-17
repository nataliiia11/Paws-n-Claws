const { app, request } = require('../../commonJest')

it('renders homepage correctly', (done) => {
  request(app)
    .get('/')
    .then((response) => {
      expect(response.text).toMatchSnapshot()
      done()
    })
  })
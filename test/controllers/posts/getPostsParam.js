const coursesController = require('../../../controller/postController')

describe('postController', function () {
  describe('getPostsParams', function () {
    it('should extract course parameters from request body ', function () {
      const expected = {
      content:"sth",
      signInUser:"sone"
      }
      
    it('should return an empty object with empty request', function () {
      const emptyBody = {}
      expect(postController.getPostsParams(emptyBody)).toStrictEqual({})
    })
  })
})
})
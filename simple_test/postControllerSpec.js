var describe = require('chai').expect;

getPostsParams: (body) => {//Export getPostsParams in postsParams.js
    const o = {}
    fields.forEach(f => {
      if (body[f]) {
        o[f] = body[f]
      }
    })
    return o
}

const chai = require("chai"), 
{ expect } = chai,
usersController = require("../Controller/UserController");
describe("usersController", () => {
  describe("getPostsParams", () => {
        it('should return an empty object with empty request body input', (done) =>{
      varemptyBody = {};

      expect(usersController.getPostsParams(emptyBody)).to.deep.include({});
      done();

    });    

  });
});
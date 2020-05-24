var describe = require('chai').expect;

const chai = require("chai"), 
{ expect } = chai,
userController = require("../Controller/UserController");
getUserParams: (body) => {//Export getUserParams in usersController.js

    return {    
        name: {
            first: body.first,
            last: body.last    
        },
            email: body.email,    
            password: body.password,    
            zipCode: body.zipCode
    };
}


describe("userController", () => {
      describe("getUserParams", () => {
              it("should convert request body to contain the name attributes of the user object", () => {
                  var body = {
                      first: "Jon",
                      last: "Wexler",
                      email: "jon@jonwexler.com",
                      password: 12345,
                      zipCode: 10016
                    };
                    expect(userController.getUserParams(body)).to.deep.include({
                        name: {
                            first: "Jon",
                            last: "Wexler"}
                        });
                    });

                          it("should return an empty object with empty request body input", () => {
                              var emptyBody = {};
                              expect(userController.getUserParams(emptyBody)).to.deep.include({});
                            });    

                        });
                    });
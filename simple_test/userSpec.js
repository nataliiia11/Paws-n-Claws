
var beforeEach = require('chai').expect;
var describe = require('chai').expect;


//Require necessary modules and set the environment as test.
process.env.NODE_ENV = "test";
//Assign a variable to the chai.expect function.
const User = require("../model/User"),
{ expect } = require("chai");

require("../main");
//Remove all users from the database before each test.
beforeEach(done => { 
    User.remove({})
    .then(() => {
        done();
    });
});
//Describe a series of tests for saving users.
describe("SAVE user", () => {
    //Define a test for saving a single user
    it("it should save one user", (done) => {
        let testUser = new User(
            {name: {
                first: "Jon",
                last: "Wexler"
            },
            email: "Jon@jonwexler.com",
            password: 12345,
            zipCode: 10016
        });
        //Set up promises to save a user with sample data, and fetch all users from the database thereafter
        testUser.save().then(() => {
            User.find({}).then(result => {
                //Expect one user with an ID to exist in the database
                expect(result.length).to.eq(1);
                expect(result[0]).to.have.property("_id");
                //Call done to complete the test with promises.
                done();
            })
        ;});
    });
});


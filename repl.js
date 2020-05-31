const mongoose = require("mongoose"), 
Users = require("./model/User"); 
Posts=require('./model/Posts')
mongoose.connect( 
 "mongodb://localhost:27017/PawsnClaws",
 {useNewUrlParser: true,useUnifiedTopology: true }
);
mongoose.Promise = global.Promise; 
Users.remove({}) 
 .then((users) => console.log(`Removed ${users.n} records!`))
 .then(() => {
 return Posts.remove({});
 })
 .then((users) => console.log(`Removed ${users.n} records!`))
 .then(() => { 
 return Users.create( {
 username: "Jon",
 email: "jon@jonwexler.com",
 password: "12345"
 });
 })
 .then(user => {
 console.log(`Created User: ${user.getInfo()}`);
 })
 .then(() => {
 return Users.findOne( {
 name: "Jon"
 });
 })
 .then(user => {
 testUser = user;
 console.log(`Found one User: ${ user.getInfo()}`);
 })
 .then(() => { 
 return Posts.create({
 content: "Tomato Land",
 
 });
 })
 .then(post => {
 testPost = post;
 console.log(`Created course: ${post.content}`);
 })
 .then(() => { 
 testUser.post.push(testPost);
 testUser.save();
 })
 .then( () => { 
 return Users.populate(testUser, "posts");
 })
 .then(user => console.log(user))
 .then(() => { 
 return Users.find({ post: mongoose.Types.ObjectId(
testPost._id) });
 })
 .then(user => console.log(user));
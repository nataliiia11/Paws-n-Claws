const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/PawsAndClaws",
    {useNewUrlParser: true});

const database = mongoose.connection;

database.once("open", () => {
    console.log("Connected to MongoDB using Mongoose");
})
const PersonSchema = mongoose.Schema({
    name : String,
    email : String 
});

const Person = mongoose.model("Person", PersonSchema);

var newPerson = new Person({
    name : "Diro Baloska",
    email : "dirobaloska@outlook.com"
})

newPerson.save((error, savedDocument) => {
    if (error) throw error;
    console.log(savedDocument);
})
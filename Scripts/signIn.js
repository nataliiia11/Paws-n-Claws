const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/PawsAndClaws",
    {userNewUrlParser: true}
);

const database = mongoose.connection;

database.once("open", ()=>{
    console.log("Connected to MongoDB using Mongoose");
})

const PersonSchema = mongoose.Schema({
    name : String,
    email: String,
    password : String
});

const Person = mongoose.model("Person", PersonSchema);

const port = 3000,
    express = require("express"),
    app = express();

app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("index.ejs");
})
.listen(port, () => {
    console.log("Express JS is listening on port number: ${port}");
})


'use strict'

const app = require('./app')
const mongoose = require('mongoose');  
require('dotenv').config();     

if (process.env.NODE_ENV === "test")
mongoose.connect("mongodb://localhost:27017/PawsnClaws",
{  useNewUrlParser: true});
else
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin-hanh:hanh@cluster1-yhbkr.mongodb.net/PawsAndClaws",
{ useNewUrlParser: true });

const mongodbURI = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/PawsnClaws' : 'mongodb+srv://admin-hanh:hanh@cluster1-yhbkr.mongodb.net/PawsAndClaws')


//mongoose implementation
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true});
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'Connection error'));
database.once('open', () => {
	console.log('Connection to database Paws And Claws succesfull.');
});



app.listen(app.get('port'), () => {
    console.log(`Server running at http://localhost:${app.get('port')}`)
  })


    
  if (process.env.NODE_ENV === "test") app.set("port", 3001);
  else app.set("port", process.env.PORT || 3000);
    module.exports = app;
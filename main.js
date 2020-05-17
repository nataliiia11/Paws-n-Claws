

'use strict'

const app = require('./app')
const mongoose = require('mongoose');  
      



//mongoose implementation
mongoose.connect('mongodb+srv://admin-hanh:hanh@cluster1-yhbkr.mongodb.net/PawsAndClaws', {useNewUrlParser: true, useUnifiedTopology: true});
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'Connection error'));
database.once('open', () => {
	console.log('Connection to database Paws And Claws succesfull.');
});



app.listen(app.get('port'), () => {
    console.log(`Server running at http://localhost:${app.get('port')}`)
  })
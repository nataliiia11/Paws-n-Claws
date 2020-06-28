'use strict';

const app = require('./app');
const mongoose = require('mongoose');  
require('dotenv').config();
//const router = require('./routes/index'); 

const mongodbURI = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/PawsnClaws' : 'mongodb+srv://admin-hanh:hanh@cluster1-yhbkr.mongodb.net/PawsAndClaws');

mongoose.Promise = global.Promise;
//mongoose implementation
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true});
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'Connection error'));
database.once('open', () => {
	console.log('Connection to database Paws And Claws succesfull.');
});


const server=app.listen(app.get('port'), () => {
	console.log(`Server running at http://localhost:${app.get('port')}`);
});

var io = require('socket.io')(server); 
require('./Controller/chatController')(io);


 
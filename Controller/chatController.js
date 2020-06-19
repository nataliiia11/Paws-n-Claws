// 'use strict';
// eslint-disable-next-line no-unused-vars
// const Message = require('../model/Message');
// module.exports = io => {
  
        
	// io.on('connection', (socket) => {
	// 	console.log('new connection');
	// 	socket.on('chat message', (msg) => {
	// 		io.emit('chat message', msg);
	// 	});
	// });
      // };
	//   "use strict";

	//   const Message = require("../model/Message");
	  
	//   module.exports = io => {
	// 	io.on("connection", client => {
	// 	  console.log("new connection");
		  
	  
	// 	  Message.find({})
	// 		.sort({ createdAt: -1 })
	// 		.limit(10)
	// 		.then(messages => {
	// 		  client.emit("load all messages", messages.reverse());
	// 		});
	  
	// 	  client.on("disconnect", () => {
	// 		console.log("user disconnected");
	// 	  });
	  
	// 	  client.on("message", data => {
	// 		let messageAttributes = {
	// 			content: data.content,
	// 			userName: data.userName,
	// 			user: data.userId
	// 		  },
	// 		  m = new Message(messageAttributes);
	// 		m.save()
	// 		  .then(() => {
	// 			io.emit("message", messageAttributes);
	// 		  })
	// 		  .catch(error => console.log(`error: ${error.message}`));
	// 	  });
	// 	});
	//   };
module.exports = io => {
// users = [];
// io.on('connection', function(socket) {
//    console.log('A user connected');
//    socket.on('setUsername', function(data) {
      
//          users.push(data);
//          socket.emit('userSet', {username: data});
     
//    })
//    socket.on('msg', function(data) {
// 	//Send message to everyone
// 	io.sockets.emit('newmsg', data);
//  })
// });
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};
	}
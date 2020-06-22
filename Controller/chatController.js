

const Message = require('../model/Message');
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
users = [];
io.on('connection', function(socket) {
   console.log('A user connected');

   Message.find({})
   		.sort({ createdAt: -1 })
   		.limit(10)
   		.then(messages => {
   		  socket.emit("load all messages", messages.reverse());
		   });
		   
   socket.on('setUsername', function(data) {
	if(users.indexOf(data) > -1) {
		socket.emit('userExists', data + ' username is taken! Try some other username.');
	 } else {
         users.push(data);
		 socket.emit('userSet', {username: data});
	 }
     
   })
   socket.on('msg', function(data) {
	//Send message to everyone
	let messageAttributes = {
		 			content: data.message,
		 			userName: data.user,
				  }
	m = new Message(messageAttributes);
	 		m.save()
	 		  .then(() => {
				io.sockets.emit('newmsg', messageAttributes);
	 		  })
			   .catch(error => console.log(`error: ${error.message}`));
	
 })
 socket.on('disconnect', function(socket) {
	console.log('A user disconnected');
	users.pop()
})
})

}

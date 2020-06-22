

const Message = require('../model/Message');

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

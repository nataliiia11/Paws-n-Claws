'use strict';
// eslint-disable-next-line no-unused-vars
const Message = require('../model/Message');
module.exports = io => {
  
        
	io.on('connection', (socket) => {
		console.log('new connection');
		socket.on('chat message', (msg) => {
			io.emit('chat message', msg);
		});
	});
      
	//   io.on("connection", (client) => {
	//     console.log("new connection");
	//     client.on('message',message=>{
	//         console.log(message)
	//     })
	//   })
	//     Message.find({})
	//       .sort({ createdAt: -1 })
	//       .limit(10)
	//       .then(messages => {
	//         client.emit("load all messages", messages.reverse());
	//       });

	//     client.on("disconnect", () => {
	//       console.log("user disconnected");
	//     });
	//     client.on("message", (data) => {
	//         let messageAttributes = {
	//             content: data.content,
	//             userName: data.userName,
	//             user: data.userId
	//             }; 
	//             m = new Message(messageAttributes);
	//          m.save()
	//         .then(() => {
	//             console.log(messageAttributes.content)
	//         //   io.emit("message", messageAttributes.content);
	//         })
	//         .catch(error => console.log(`error: ${error.message}`));
    
	//     });
	//   });
  
};
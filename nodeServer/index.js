// Node server which will handle socket io connections
// const io = require('socket.io')(3000);              //the server socket.io listen the request of incoming events
  const http = require('http');
  const cors = require('cors');
  const socketIo = require('socket.io');
  
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running\n');
  });

const io = socketIo(server, {
    cors: {
      origin: "http://127.0.0.1:5500", // Adjust this to match your client's URL
      methods: ["GET", "POST"]
    }
  });
  
  server.listen(3000, () => {
    console.log('Server running on port 3000');
  });





const users = {};

io.on('connection', socket =>{                    //it will connect the all and any user (io socket)
    console.log("New user connected:", socket.id); // Log when a new user connects

    socket.on('new-user-joined', name =>{              //Socket.IO is a popular JavaScript library that enables real-time, bidirectional communication between web clients and servers. it tell when one user join the chat.
        console.log("New user", name)
        users[socket.id]= name;
        socket.broadcast.emit('user-joined', name);               //socket.broadcast.emit() is used to send a message to all connected clients except the one that triggered the event. 
    });


    socket.on('send', message =>{
        console.log('Received message:', message);
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]});
    });


    // Handle user disconnection
    socket.on('disconnect', message => {
        console.log("User disconnected:", users[socket.id]);
        // Notify other users of the disconnection
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]; // Remove the user from the list
    });

})













const path = require('path'),
      http = require('http'),
      express = require('express'),
      socketIO = require('socket.io'),
      {generateMessage, generateLocationMessage} = require('./utils/message'),
      {isRealString} = require('./utils/validation'),
      {Users} = require('./utils/users'),
      publicPath = path.join(__dirname, '../public'),
      port = process.env.PORT || 3000;
var   app = express(),
      server = http.createServer(app),
      io = socketIO(server),
      users = new Users();

app.use(express.static(publicPath));

// io.emit -> event to every user in every room
// io.to('roomname').emit -> event to every user in a room
// socket.broadcast.emit -> event to every user in every room, except for user of socket
// socket.broadcast.to('roomname').emit -> event to every user in a room, except for user of socket
// socket.emit -> event to/from user of socket
io.on('connection', (socket) => {
    console.log('connected to client');

    socket.on('splash', () => {
        socket.emit('updateRoomList', users.getRoomList());
    });

    socket.on('join', (params, acknowledge) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return acknowledge('Display Name and Room Name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id); // remove then add to exit previous rooms and prevent id conflict
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage("Admin", "Welcome to io chat"));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined the room`));
        acknowledge();
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
    });

    socket.on('createMessage', (message, acknowledge) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        acknowledge();
    });

    socket.on('createLocationMessage', (coords) => {
        console.log('createLocationMessage detected:', coords);
        var user = users.getUser(socket.id);
        if (user && coords) {
            io.emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));            
        }
    });
});

server.listen(port, () => {
    console.log(`chat app is now listening on PORT: ${port}`);
});
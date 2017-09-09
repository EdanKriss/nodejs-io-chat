
const path = require('path'),
      http = require('http'),
      express = require('express'),
      socketIO = require('socket.io'),
      {generateMessage, generateLocationMessage} = require('./utils/message'),
      publicPath = path.join(__dirname, '../public'),
      port = process.env.PORT || 3000;
var   app = express(),
      server = http.createServer(app),
      io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('connected to client');

    socket.emit('newMessage', generateMessage("Admin", "Welcome to io chat"));
    socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joins chat"));

    socket.on('disconnect', () => {
        console.log('disconnected from client');
    });

    socket.on('createMessage', (message, acknowledge) => {
        console.log('createMessage detected:', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        acknowledge();
    });

    socket.on('createLocationMessage', (coords) => {
        console.log('createLocationMessage detected:', coords);
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
});

server.listen(port, () => {
    console.log(`chat app is now listening on PORT: ${port}`);
});
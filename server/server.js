
const path = require('path'),
      http = require('http'),
      express = require('express'),
      socketIO = require('socket.io'),
      publicPath = path.join(__dirname, '../public'),
      port = process.env.PORT || 3000;
var   app = express(),
      server = http.createServer(app),
      io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('connected to client');

    socket.on('disconnect', () => {
        console.log('disconnected from client');
    });
    socket.emit('newMessage', {
        from: 'mike',
        text: 'We like it here!',
        createAt: 123
    });
    socket.on('createMessage', (message) => {
        console.log('createMessage detected:', message);
    });
});

server.listen(port, () => {
    console.log(`chat app is now listening on PORT: ${port}`);
});
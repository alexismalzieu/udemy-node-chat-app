const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);;

const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Alex',
        text: 'Hey! What is going on?',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



server.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`)
});

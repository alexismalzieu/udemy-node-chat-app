const path = require('path');
const http = require('http');
const express = require('express');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);;

const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



server.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`)
});

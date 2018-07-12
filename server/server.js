const path = require('path');
const http = require('http');
const express = require('express');
const {generateMessage} = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);;

const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('welcomeMessage',generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newUser',generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



server.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`)
});

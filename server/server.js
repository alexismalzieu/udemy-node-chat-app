const path = require('path');
const http = require('http');
const express = require('express');

const {isRealString} = require('./utils/validation');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);;

const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and room name are required');
        }


        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', ` ${params.name} has join`))
        socket.join(params.room);

        callback();

    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();
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

//io.emit : emits to every connected users
//socker.broadcast.emit : emits to everybody expect the current user
//socker.emit : emits to specificly one user
//io.to('room_name').emit : emits to everybody in the room_name
//socket.broadcast.to('room_name').emit : emits to everybody in the room_name expect the current user
//socket.leave('room_name')

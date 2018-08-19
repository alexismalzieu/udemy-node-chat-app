const path = require('path');
const http = require('http');
const express = require('express');

const {isRealString} = require('./utils/validation');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {Users} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const users = new Users();

const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', ` ${params.name} has join`))

        callback();

    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))

        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');

        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));

        }
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

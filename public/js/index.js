var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createMessage', {
        to: 'Andrew',
        text: 'Hey. This is Alex.'
    });
});

socket.on('disconnect', function() {
    console.log('Disconected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});

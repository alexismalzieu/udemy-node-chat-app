var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

});

socket.on('disconnect', function() {
    console.log('Disconected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});

socket.on('welcomeMessage', function(message) {
    console.log( message);
});

socket.on('newUser', function(message) {
    console.log(message);
});
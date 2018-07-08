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
    socket.on('disconnect', (socket) => {
        console.log('Client disconnected');
    });
});



// app.get('/', function (req, res) {
//   res.send('./../public/index.html');
// })

server.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`)
});

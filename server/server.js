const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath))

// app.get('/', function (req, res) {
//   res.send('./../public/index.html');
// })

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`)
})

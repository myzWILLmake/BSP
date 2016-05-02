var express = require('express');

var app = express();
app.listen(10088);

app.post('/', function(req, res) {
  res.send('Hello World!');
});

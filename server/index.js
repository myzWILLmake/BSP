var path = require('path');
var express = require('express');

var session = require('express-session');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session);

var server = express();
server.listen(10088);

server.use(session({
  secret: 'Akagi.moe',
  store: new MongoStore({
    url: 'mongodb://localhost/BSP',
    ttl: 1 * 24 * 60 * 60
  })
}));

server.use(bodyParser.json());
server.use(express.static(__dirname + "/../static"));

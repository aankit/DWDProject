var express = require('express');

var app = express.createServer();
app.use(express.bodyParser());

var devices = require('./devices.js');

app.get('/', function(req, res){
  res.render('index.ejs', {title: 'DataLog'});
});

app.get('/devices', devices.list);

app.get('/devices/add', function(req, res) {
  res.render('add.ejs', {title: 'Add a Device'});
});

app.post('/devices/add', devices.add);

app.get('/devices/:title', devices.single);

app.get('/*', function(req, res) {
  res.status(404).render('error.ejs', {title: 'Error'});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});


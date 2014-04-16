var express = require('express');
var app = express();

var expressHandlebars = require('express3-handlebars');

var handlebars = expressHandlebars.create({defaultLayout: 'main'});

app.use(express.bodyParser());

var data = require('./data');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/users', function(req, res){
  res.render('users', {
  	users: data.users
  });
});

app.get('/users/:name', function(req, res){
	var name = req.params.name;
	var key = findUser(name);
	res.render('devices', { 
  	user: data.users[key]
  });
});

app.get('/users/:name/:deviceName', function(req, res){
	var name = req.params.name;
	var key = findUser(name);
	var deviceName = req.params.deviceName;
	var key2 = findDevice(data.users[key], deviceName);
    res.render('sensors', { 
    user : data.users[key],
    device: data.users[key].device[key2]
  });
});

function findUser(name){
	for (var i = 0; i<data.users.length; i++){
		if (data.users[i].name === name ){
			return i;
		}
	}
	
};

function findDevice(user, deviceName){
	for (var i = 0; i<user.device.length; i++){
		if (user.device[i].name === deviceName){
			return i
        }
	}
};




app.use('/public', express.static('public'));

var port = Number(process.env.PORT || 5000);
console.log('Listening on port',port);
app.listen(port);


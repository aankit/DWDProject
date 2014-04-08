var devices = require('./data/devices').data;

exports.list = function(req, res){
  res.render('devices.ejs', {
    title: 'User Page - Device List',
    devices: devices
  });
};

exports.single = function(req, res) {
	var data = devices.filter(function  (device) {
    return (device.url === req.params.title);
  });

  if (data.length > 0) {
    data = data[0];
    data.title = 'DataLog - Device';

    res.render('device.ejs', data);
  } else {
    res.status(404).render('error.ejs', {title: 'Device Not Found'});
  }
};

exports.add = function(req, res) {
  res.render('suggest_result.ejs', {
    title: 'Thanks!',
    name: req.body.name,
    sensors: req.body.sensors,
    inputs: req.body.inputs
  });
};
module.exports = function(app, passport) {

// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index');
	});

	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user
		})
	});
	// ADDING New Devices and Sensors ===========================================
	app.post('/newDevice', isLoggedIn,  function(req, res) { 
  		req.user.local.device.push({deviceName: req.body['deviceName']});
  		var subdoc = req.user.local.device[0];
		console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
		subdoc.isNew; // true
    	req.user.local.save(function (err) {
  		if (err) return handleError(err)
  		console.log('Success!');
		});
    	res.redirect('/profile');
  	});
	
	app.post('/removeDevice', isLoggedIn,  function(req, res) { 
		var doc = req.user.local.device.id(req.body['deviceId']).remove();
		req.user.local.save(function (err) {
  		if (err) return handleError(err);
  		console.log('the sub-doc was removed')
	});
    	res.redirect('/profile');
  	});

	app.post('/newSensor', isLoggedIn,  function(req, res) { 
		var dev = req.user.local.device.id(req.body['deviceId'])
		dev.sensor.push({sensorName: req.body['sensorName']});
  		var subdoc = dev.sensor[0];
		console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
		subdoc.isNew; // true
    	req.user.local.save(function (err) {
  		if (err) return handleError(err)
  		console.log('Success!');
		});
    	res.redirect('/profile');
  	});
	app.post('/removeSensor', isLoggedIn,  function(req, res) { 
		var dev = req.user.local.device.id(req.body['deviceId'])
		var sen = dev.sensor.id(req.body['sensorId']).remove();
		req.user.local.save(function (err) {
  		if (err) return handleError(err);
  		console.log('the sub-doc was removed')
	});
    	res.redirect('/profile');
  	});


  	app.post('/writeValue', isLoggedIn,  function(req, res) { 
		var dev = req.user.local.device.id(req.body['deviceId'])
		var sen = dev.sensor.id(req.body['sensorId']);
		sen.sensorValue.push(req.body['sensorValue']);
    	req.user.local.save(function (err) {
  		if (err) return handleError(err)
  		console.log('Success!');
		});
    	res.redirect('/profile');
  	});
	
	


	app.get('/newDevice', function(req, res) {
		res.redirect('/profile');
	});
	app.get('/newSensor', function(req, res) {
		res.redirect('/profile');
	});
// <form action="http://127.0.0.1:8080/myaction" method="post">
		

		

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	app.get('/index', function(req, res) {
		res.redirect('/');
	});





// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login', function(req, res) {
			res.render('login', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup', { message: req.flash('signupMessage') });
		});

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}

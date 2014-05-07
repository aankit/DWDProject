var express = require('express');
var expressHandlebars = require('express3-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var app = express();
var configDB = require('./config/mongo.js');

// configuration ===============================================================
mongoose.connect(configDB.url); 
require('./config/passport')(passport); // pass passport for configuration
app.use('/public', express.static('public'));

// set up our express application
app.use(express.logger('dev')); // log every request to the console
app.use(express.cookieParser()); // read cookies (needed for auth)
app.use(express.bodyParser()); // get information from html forms
app.engine('handlebars', expressHandlebars({defaultLayout:'main'}));


app.set('view engine', 'handlebars'); // set up ejs for templating
//app.set('view engine', 'ejs');
// required for passport
app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
// var checkLogin = require('./middleware/check_login');
// var requireLogin = require('./middleware/require_login');
// app.use(checkLogin);


// routes ======================================================================
// load our routes and pass in our app and fully configured passport


require('./routes/routes.js')(app, passport);




var port = Number(process.env.PORT || 5000);
app.listen(port);
console.log('Listening on port',port);



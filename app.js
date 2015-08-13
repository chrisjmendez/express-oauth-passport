var express      = require('express')
, path         = require('path')
, favicon      = require('serve-favicon')
, logger       = require('morgan')
, cookieParser = require('cookie-parser')
, bodyParser   = require('body-parser')

, routes       = require('./routes/index')
, users        = require('./routes/users')


/* ** ** ** ** ** ** ** ** ** ** ** 
New Code Starts 
**/
//F. Load an Auth file to handle Strategy authentication
var auth    = require('./routes/auth');

//A. This add the Passport library into your express app
var passport = require('passport');

//B. Add Express Session to your app
var session  = require('express-session')

/**
New Code Ends 
* ** ** ** ** ** ** ** ** ** ** **/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// view engine setup
app.locals.pretty = true;
app.set('port', process.env.PORT || 8080);
//app.set('ipaddress', process.env.HOST || "localhost");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ** ** ** ** ** ** ** ** ** ** ** 
New Code Starts 
**/

//C. This allows Paspport to set-up the framework for what it needs to do
app.use(session({ 
	secret: 'mySecret',
    saveUninitialized: true, // (default: true)
    resave: true // (default: true)
}))
app.use(passport.initialize());
app.use(passport.session())

//D. Create a new Google Strategy for Passport
var Strategy = {}
Strategy.Google = {}
Strategy.Google = require('passport-google-oauth').OAuth2Strategy;

//E. Configure the Google Strategy. Tell http://console.developers.google.com who we are
passport.use(new Strategy.Google({
	clientID:     'Insert a Client ID from GOogle',
	clientSecret: 'Insert a Client Sercret from Google',
	callbackURL:  'http://localhost:8080/auth/google/callback'
	},
    function(req, accessToken, refreshToken, profile, done){
        done(null, profile);
    }	
))

//F. This is what Passport uses to place a user object into the session
passport.serializeUser(function(user, done){
	//Done with no errors and just user id
	done(null, user)
})

//G. Deserialize is what Passport uses to pull a user out of a session
passport.deserializeUser(function(user, done){
	done(null,user)
})

/** 
New Code Ends 
* ** ** ** ** ** ** ** ** ** ** **/

app.use('/', routes);
app.use('/users', users);

/* ** ** ** ** ** ** ** ** ** ** ** 
New Code Starts 
**/
//G. 
app.use('/auth', auth)
/** 
New Code Ends 
* ** ** ** ** ** ** ** ** ** ** **/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

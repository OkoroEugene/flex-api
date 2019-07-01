if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'prod') {
    process.env.DEBUG = '*';
}

if (/prod/gi.test(process.env.NODE_ENV) || process.env.PORT) {
    process.env.MODE = 'prod';
}

const _mongoose = require('mongoose'),
    _debug = require('debug')('Flex'),
    _express = require('express'),
    _passport = require('passport'),
    _cookieParser = require('cookie-parser'),
    _bodyParser = require('body-parser'),
    _jwt = require('jsonwebtoken'),
    _app = _express(),
    _multer = require('multer'),
    session = require("express-session"),
    _upload = _multer({
        dest: 'public/uploads'
    });

const _config = require('./src/config/config')(process.env.MODE || 'dev'),
    _routes = require('./src/routes/index');


_app.use(_express.static('public'));
_app.use(_cookieParser());
const isAuthenticated = _passport.authenticate('jwt', {
    session: false
});

_app.use(_bodyParser.json({
    limit: '50mb'
})),
    _app.use(_bodyParser.urlencoded({
        extended: false,
        limit: '50mb'
    })),
    _app.use(_express.static('public')),
    _app.use(_passport.initialize()),
    _app.use(_passport.session()),
    _app.use('/api/user', isAuthenticated, _routes.userRouter),
    _app.use('/api/driver', isAuthenticated, _routes.driverRouter),
    require('./src/services/AuthenticationService')(_passport, _config),
    _app.use('/', _routes.authRouter);

_app.get('/', function (req, res) {
    res.send("express application");
});

_app.get('/login', function (req, res) {
    res.send("you need to login");
});

const _server = _app.listen(process.env.PORT || _config.app.port, () => _debug(`server started on port: ${process.env.PORT || _config.app.port}`)),
    _dbURI = `mongodb://${_config.database.user}:${_config.database.password}@${_config.database.host}:${_config.database.port}/${_config.database.name}`;

_mongoose.connect(_dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if (err) {
        console.log("==================================================");
        console.log(err);
        console.log("----------------------_________________________________---------------------");
    }
    console.log("mongoose connection was successful");

    function isLoggedIn(request, response, next) {
        if (request.isAuthenticated()) {
            return next();
        }
        response.redirect('/login');
    }
});

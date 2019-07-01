var _router = require('express').Router(),
    _passport = require('passport'),
    _jwt = require('jsonwebtoken'),
    _config = require('../config/config')(process.env.MODE || 'dev');

_router.post('/register', function (req, res, next) {
    const userService = new (require('../services/UserService'))();
    userService.save(req.body, (error, result) => {
        console.log(error);
        console.log(result);
        if (error) return res.status(500).json({
            message: 'An error occurred when trying to save the user.',
            user: req.body,
            error
        });
        _passport.authenticate('local', {
            session: false
        }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, {
                session: false
            }, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = _jwt.sign({
                    id: user._id,
                    username: user.email
                }, _config.auth.secret, { expiresIn: '1h' });
                return res.json({
                    user: user,
                    token
                });
            });
        })(req, res);
    });
});

_router.post('/login', function (req, res, next) {
    console.log("====================================in authentication route==========================");
    console.log(req.body);
    console.log("---------------------------------------------------------------------------------------");
    _passport.authenticate('local', {
        session: false
    }, (err, user, info) => {
        console.log(req.body);
        console.log("inside the somewhere");
        if (err || !user) {
            return res.status(400).json({
                message: 'Invalid login credentials',
                user: user,
                error: err
            })
        }
        req.login(user, {
            session: false
        }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = _jwt.sign({
                id: user._id,
                email: user.email
            }, _config.auth.secret, { expiresIn: '1h' });
            return res.json({
                user: user,
                token
            });
        });
    })(req, res);
});

_router.post('/verify', (req, res) => {
    _jwt.verify(req.body.token, _config.auth.secret, function (err, decoded) {
        if (!decoded) {
            return res.status(404).json({ message: "Session has expired" })
        }
        var _user = require('../schemas/User').model;
        _user.findById(decoded.id, (err, user) => {
            if (!user) return res.status(404).json({ message: "User not found" })
            return res.send(user);
        })
    });
});


_router.get('/auth/facebook', _passport.authenticate('facebook'));

_router.get('/auth/facebook/callback',
    _passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
    (req, res) => (console.log(req.user), res.redirect('TryMoi://login?user=' + JSON.stringify(req.user))));

_router.get('/auth/google', _passport.authenticate('google', { scope: ['profile', 'email'] }));

_router.get('/auth/google/callback',
    _passport.authenticate('google', { failureRedirect: '/auth/google' }),
    (req, res) => (console.log("================================", JSON.stringify(req.user)), res.redirect('TryMoi://login?user=' + JSON.stringify(req.user))));



module.exports = _router;
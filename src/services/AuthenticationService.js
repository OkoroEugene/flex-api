module.exports = function (passport, config) {
    const https = require('https'),
        GOOGLE_OATH2 = require('googleapis').google.auth.OAuth2,
        LocalStrategy = require('passport-local').Strategy,
        GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
        FacebookStrategy = require('passport-facebook').Strategy,
        passportJWT = require("passport-jwt"),
        JWTStrategy = passportJWT.Strategy,
        ExtractJWT = passportJWT.ExtractJwt,
        debug = require('debug'),
        userService = new (require('./UserService'))(),
        User = require('../schemas/User').model;

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        userService.findById(id, function (err, user) {
            if (err) throw err;
            done(null, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password", //Username and password have to be supplied else this passport strategy fails
        session: true,
        passReqToCallback: true
    }, function (req, email, password, done) {
        userService.findOneByParam({
            email: new RegExp(email, "gi")
        }, function (err, user) {
            // debug(req.body);
            console.log(user);
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Invalid credentials.'
                });
            }
            if (!user.confirmPassword(password)) {
                return done(null, false, {
                    message: 'Invalid credentials.'
                });
            }
            return done(null, user);
        });
    }
    ));

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.auth.secret,
        passReqToCallback: true
    },
        function (req, jwtPayload, done) {
            return userService.findById(jwtPayload.id, (err, user) => {
                if (err) return done(err);
                delete user.password;
                return done(null, user);
            });
        }
    ));

    passport.use(new GoogleStrategy({
        clientID: config.googleOauth.web.client_id,
        clientSecret: config.googleOauth.web.client_secret,
        callbackURL: config.googleOauth.web.redirect_uris[0]
    },
        function (token, refreshToken, profile, done) {
            return userService.findOneByParam({
                socialId: profile.id
            }, {}, function (err, user) {
                if (err)
                    return done(err);

                console.log(profile);

                if (user) {
                    console.log(user);
                    return userService.update({
                        socialId: profile.id
                    }, {
                            $set: {
                                socialToken: token
                            }
                        }, (error, userId) => {
                            if (error) return done(error);
                            return done(null, Object.assign(user, {
                                socialToken: token
                            }));
                        });
                } else {
                    let username = profile.displayName.replace(/ +/g, "") + profile.id,
                        newUser = {
                            username: username,
                            password: username,
                            socialId: profile.id,
                            socialToken: token,
                            socialName: profile.displayName,
                            socialType: "GOOGLE",
                            email: profile.emails.length && profile.emails[0].value,
                            avatar: profile.photos[0].value,
                        };
                    return userService.save(newUser, function (err, newUserId) {
                        if (err)
                            throw err;
                        return done(null, Object.assign(newUser, {
                            _id: newUserId
                        }));
                    });
                }
            });
        }));

    passport.use(new FacebookStrategy(config.facebookOauth, function (accessToken, refreshToken, profile, done) {
        return userService.findOneByParam({
            socialId: profile.id
        }, function (err, user) {
            if (err)
                return done(err);

            console.log(profile);

            if (user) {
                return userService.update({
                    socialId: profile.id
                }, {
                        $set: {
                            socialToken: accessToken
                        }
                    }, (error, userId) => {
                        if (error) return done(error);
                        return done(null, Object.assign(user, {
                            socialToken: accessToken
                        }));
                    });
            } else {
                let username = profile.displayName.replace(/ +/g, "") + profile.id,
                    newUser = {
                        username: username,
                        password: username,
                        socialId: profile.id,
                        socialToken: accessToken,
                        socialName: profile.displayName,
                        socialType: "FACEBOOK",
                        email: profile.emails.length && profile.emails[0].value,
                        avatar: profile.photos[0].value,
                    };
                return userService.save(newUser, function (err, newUserId) {
                    if (err)
                        throw err;
                    return done(null, Object.assign(newUser, {
                        _id: newUserId
                    }));
                });
            }
        });
    }));

    async function verifyGoogleToken (accessToken) {
        let oauthClient = new GOOGLE_OATH2(config.googleOauth.web.client_id, config.googleOauth.web.client_secret, config.googleOauth.web.redirect_uris[0]);
        return await oauthClient.getTokenInfo(accessToken);
    }

    function verifyFacebookToken (token) {
        return getFBAccessToken().then(async data => {
            return await httpsGET(`https://graph.facebook.com/debug_token?input_token=${token}&access_token=${data.access_token}`);
        }).then(result => result.data);
    }

    function getFBAccessToken () {
        return httpsGET(`https://graph.facebook.com/oauth/access_token?client_id=${config.facebookOauth.clientID}&client_secret=${config.facebookOauth.clientSecret}&grant_type=client_credentials`)
    }

    function httpsGET (url) {
        return new Promise((resolve, reject) => {
            https.get(url, resp => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    resolve(JSON.parse(data));
                });
            }).on("error", (err) => {
                reject("Error: " + err.message);
            });
        });
    }
};
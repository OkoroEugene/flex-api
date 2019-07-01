const getConfig = env => {
    const prodURL = "flex.herokuapp.com";
    const config = {
        dev: {
            app: {
                host: 'localhost',
                port: 6057
            },
            database: {
                name: 'flex',
                host: 'localhost',
                port: 27017,
                user: '',
                password: ''
            },
            auth: {
                saltRounds: 10,
                secret: "toomuchsauce"
            },
            facebookOauth: {
                clientID: "618609228607578",
                clientSecret: "346f60db8f5c3c39aabe4c0a80a76f6e",
                callbackURL: `https://${prodURL}/auth/facebook/callback`,
                profileFields: ['id', 'name', 'displayName', 'picture', 'emails', 'email'],
                scope: 'email'
            },
            googleOauth: {
                credentials: {
                    installed: {
                        client_id: "558367869731-hh09okdcqojode5mo354md1oia45fhfp.apps.googleusercontent.com",
                        project_id: "trymoi-223814",
                        auth_uri: "https://accounts.google.com/o/oauth2/auth",
                        token_uri: "https://www.googleapis.com/oauth2/v3/token",
                        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
                        client_secret: "6aRsQq-JaWGuyZscviF_gt6w",
                        redirect_uris: ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
                    }
                },
                web: {
                    "client_id": "558367869731-s22nnmh0hgtf0l02ob7hmgsvtsdvs5ji.apps.googleusercontent.com",
                    "project_id": "trymoi-223814",
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                    "client_secret": "zTcf4h3w4kj-R5XrrjFUK0fb",
                    "redirect_uris": [
                        `http://${prodURL}/auth/google/callback`
                    ]
                },
                scopes: ['https://www.googleapis.com/auth/youtube']
            },
            cloudinary: {
                cloud_name: 'hyper-debugger',
                api_key: '794188859837429',
                api_secret: '8ASzBZZm84j3_aNfSCv4DLjuGZY',
                url: 'cloudinary://794188859837429:8ASzBZZm84j3_aNfSCv4DLjuGZY@hyper-debugger'
            }
        },
        prod: {
            app: {
                host: 'localhost',
                port: 9000
            },
            database: {
                name: 'heroku_1phf5hr2',
                host: 'ds117846.mlab.com',
                port: 17846,
                user: 'heroku_1phf5hr2',
                password: 'bjrarvvp3r1q6r50k0eupfcrnn'
            },
            auth: {
                saltRounds: 10,
                secret: "toomuchsauce"
            },
            facebookOauth: {
                clientID: "618609228607578",
                clientSecret: "346f60db8f5c3c39aabe4c0a80a76f6e",
                callbackURL: `https://${prodURL}/auth/facebook/callback`,
                profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
                scope: 'email'
            },
            googleOauth: {
                credentials: {
                    installed: {
                        client_id: "558367869731-hh09okdcqojode5mo354md1oia45fhfp.apps.googleusercontent.com",
                        project_id: "trymoi-223814",
                        auth_uri: "https://accounts.google.com/o/oauth2/auth",
                        token_uri: "https://www.googleapis.com/oauth2/v3/token",
                        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
                        client_secret: "6aRsQq-JaWGuyZscviF_gt6w",
                        redirect_uris: ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
                    }
                },
                web: {
                    "client_id": "558367869731-s22nnmh0hgtf0l02ob7hmgsvtsdvs5ji.apps.googleusercontent.com",
                    "project_id": "trymoi-223814",
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                    "client_secret": "zTcf4h3w4kj-R5XrrjFUK0fb",
                    "redirect_uris": [
                        `http://${prodURL}/auth/google/callback`
                    ]
                },
                scopes: ['https://www.googleapis.com/auth/youtube']
            },
            cloudinary: {
                cloud_name: 'hyper-debugger',
                api_key: '794188859837429',
                api_secret: '8ASzBZZm84j3_aNfSCv4DLjuGZY',
                url: 'cloudinary://794188859837429:8ASzBZZm84j3_aNfSCv4DLjuGZY@hyper-debugger'
            }
        }
    }
    return config[env];
};

module.exports = getConfig;
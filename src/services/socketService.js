const apiKey = "46278242",
    apiSecret = "6a11ea4ca9258701c8c3ec95ec82448097ba5186",
    OpenTok = require('opentok'),
    opentok = new OpenTok(apiKey, apiSecret);
var sockets = {};
var connectedUsers = {};
// var online = [];

sockets.init = function (server) {
    // socket.io setup
    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function (socket) {
        socket.on('trytest', () => {
            socket.emit('test', "Obinna Okoro")
        })

        socket.on('login', function (user) {
            // io.emit('noOfConnections', Object.keys(io.sockets.connected).length);
            connectedUsers[socket.id] = user;
            socket.join(user);
            // online.push(user);
            io.sockets.emit('online', Object.values(connectedUsers));
        })

        socket.on('online', function () {
            io.sockets.emit('online', Object.values(connectedUsers));
        })

        socket.on('disconnect', function (err) {
            if (connectedUsers[socket.id]) {
                socket.leave(connectedUsers[socket.id]);
                destroyStream(connectedUsers[socket.id]);
                // online.splice(online.indexOf(connectedUsers[socket.id]), 1)
                delete connectedUsers[socket.id];
                io.sockets.emit('online', Object.values(connectedUsers));
            }
            console.log("user just got disconnected", connectedUsers[socket.id]);
        });

        socket.on('logout', function (user) {
            //remove user
        })

        socket.on('typing', function (user) {
            io.sockets.in(user.recipient).emit('typing', user)
        })

        socket.on('stopTyping', function (Id) {
            io.sockets.in(Id).emit('stopTyping')
        })

        socket.on('chat', function (response) {
            console.log(io.sockets.adapter.rooms);
            io.sockets.in(response.recipient._id).emit('messageSent', response);
        });

        socket.on('streamCreated', stream => {
            io.emit('streamCreated', stream);
        });

        socket.on('streamDestroyed', stream => {
            io.emit('streamDestroyed', stream);
        });

        socket.on('signal', function (body) {
            var model = require('../schemas/TokBoxChat').model;
            var streamModel = require('../schemas/TokBoxStream').model;
            model.create(body);
            streamModel.find({
                $and: [{
                    session: body.session
                }, {
                    active: true
                }]
            }, (err, result) => {
                streamModel.populate(result, { path: "user" }, (err, details) => {
                    details.map(e => {
                        let data = ({
                            text: body.text,
                            username: e.user && e.user._id == body.user ? e.user.username : undefined,
                            avatar: e.user && e.user._id == body.user ? e.user.avatar : undefined
                        })
                        io.sockets.in(e.user._id).emit('signal', data);
                    })
                })
            })
        });

        socket.on('notification', function (participants) {
            var notificationService = new (require('../services/NotificationService'))();
            participants.map(e => {
                notificationService.findByParam({
                    $and: [{
                        recipients: {
                            $in: e
                        }
                    }, {
                        isRead: false || null
                    }]
                }, function (err, result) {
                    return notificationService.repository.model.populate(result, { path: 'recipient sender' }, function (err, details) {
                        io.sockets.in(e).emit('notification', details);
                    })
                })
            })
        });

        function destroyStream(user) {
            var streamService = new (require('../services/StreamService'))();
            streamService.update({
                user: user
            }, {
                    $set: {
                        active: false
                    }
                }, (err, result) => {
                    //something
                });
        }
    });

}

module.exports = sockets;
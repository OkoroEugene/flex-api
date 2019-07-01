const _BaseRepository = require('./BaseRepository'),
    _User = require('../schemas/User').model,
    ObjectId = require('mongoose').mongo.ObjectID;

function UserRepository() {
    this.model = _User;
};

UserRepository.prototype = Object.create(_BaseRepository.prototype);

module.exports = UserRepository;
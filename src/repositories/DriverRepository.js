const _BaseRepository = require('./BaseRepository'),
    _User = require('../schemas/Driver').model,
    ObjectId = require('mongoose').mongo.ObjectID;

function DriverRepository() {
    this.model = _User;
};

DriverRepository.prototype = Object.create(_BaseRepository.prototype);

module.exports = DriverRepository;
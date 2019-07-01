const _mongoose = require('mongoose'),
    _Schema = _mongoose.Schema,
    _config = require('../config/config')(process.env.MODE || 'dev'),
    _constants = require('../config/constants');

const Driver = new _Schema({
    licenceNumber: String,
    expDate: Date,
    dob: Date,
    address: String,
    vehicleRegPhoto: String,
    avatarPhoto: String,
    SSN: String,
    user: {
        type: _Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = {
    schema: Driver,
    model: _mongoose.model('Driver', Driver)
};
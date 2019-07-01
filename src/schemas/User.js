const _mongoose = require('mongoose'),
    _Schema = _mongoose.Schema,
    _bcrypt = require('bcrypt'),
    _config = require('../config/config')(process.env.MODE || 'dev'),
    _constants = require('../config/constants');

const User = new _Schema({
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    password: {
        type: String,
        required: true
    },
    socialId: String,
    socialToken: String,
    socialName: String,
    socialType: {
        type: String,
        enum: ["FACEBOOK", "GOOGLE"]
    },
    avatar: String,
    userType: {
        type: _Schema.Types.String,
        enum: [_constants.USERTYPE.DRIVER, _constants.USERTYPE.RIDER],
        default: _constants.USERTYPE.RIDER
    }
});

User.index({
    email: 1
}, {
        unique: true
    });

User.pre("save", function (next) {
    if (!this.password || !this.email) throw new Error("email and password is required");
    this.password = _bcrypt.hashSync(this.password, _config.auth.saltRounds);
    next();
});

User.methods.confirmPassword = function (password) {
    return _bcrypt.compareSync(password, this.password);
};

module.exports = {
    schema: User,
    model: _mongoose.model('User', User)
};
const _controllerHelper = require('./ControllerHelper'),
    _service = new (require('../services/UserService'))(),
    debug = require('debug')('UserController'),
    _constants = require('../config/constants');

function UserController() {
    this.service = _service;
}

UserController.prototype = Object.create(_controllerHelper.prototype);

UserController.prototype.addCard = function (req, res) {
    return this.service.update({
        _id: req.user.id
    }, {
            "$push": {
                card: req.body
            }
        }, { multi: true }, (err, result) => {
            return res.send(err || result);
            // console.log(result || err)
        }
    );
}

module.exports = UserController;
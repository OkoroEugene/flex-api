const _controllerHelper = require('./ControllerHelper'),
    _service = new (require('../services/UserService'))(),
    debug = require('debug')('UserController'),
    _constants = require('../config/constants');

function UserController() {
    this.service = _service;
}

UserController.prototype = Object.create(_controllerHelper.prototype);

module.exports = UserController;
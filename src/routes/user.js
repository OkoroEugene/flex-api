// @ts-nocheck
const _router = require('express').Router(),
    _userController = new (require('../controllers/UserController'))(),
    _constants = require('../config/constants')

_router.get('/', _userController.findAll.bind(_userController));
_router.get('/:id', _userController.findById.bind(_userController));
_router.post('/', _userController.save.bind(_userController));
_router.post('/card', _userController.addCard.bind(_userController));
_router.put('/:id', _userController.updateById.bind(_userController));
_router.delete('/:id', _userController.delete.bind(_userController));

module.exports = _router;
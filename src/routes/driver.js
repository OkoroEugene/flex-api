// @ts-nocheck
const _router = require('express').Router(),
    _driverController = new (require('../controllers/DriverController'))(),
    _constants = require('../config/constants')

_router.get('/', _driverController.findAll.bind(_driverController));
_router.get('/:id', _driverController.fetchDriver.bind(_driverController));
_router.post('/', _driverController.save.bind(_driverController));
_router.put('/', _driverController.update.bind(_driverController));
_router.delete('/:id', _driverController.delete.bind(_driverController));

module.exports = _router;
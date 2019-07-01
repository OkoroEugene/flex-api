function DriverService() {
    this.repository = new (require('../repositories/DriverRepository'))();
}

DriverService.prototype = Object.create(require('./ServiceHelper').prototype);

module.exports = DriverService;
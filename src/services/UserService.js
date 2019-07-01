function UserService() {
    this.repository = new (require('../repositories/UserRepository'))();
}

UserService.prototype = Object.create(require('./ServiceHelper').prototype);

module.exports = UserService;
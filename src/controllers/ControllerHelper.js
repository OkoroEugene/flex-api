const _service = new (require('../services/ServiceHelper'))();

function ControllerHelper() {
    this.service = _service;
}

ControllerHelper.prototype.save = function (req, res) {
    return this.service.save(req.body, (error, result) => {
        return res.send(error || result);
    });
};

ControllerHelper.prototype.findAll = function (req, res) {
    return this.service.findAll((error, result) => {
        return res.send(error || result);
    });
};

ControllerHelper.prototype.findById = function (req, res) {
    return this.service.findById(req.params.id, (error, result) => {
        return res.send(error || result);
    });
};

// ControllerHelper.prototype.findByParam = function (ref, options) {
//     return this.service.findByParam(query, options, (error, result) => {
//         return res.send(error || result);
//     });
// };

ControllerHelper.prototype.delete = function (req, res) {
    return this.service.deleteById(req.params.id, (error, result) => {
        return res.send(error || result);
    });
};

ControllerHelper.prototype.update = function (req, res) {
    return this.service.update(req.params.id, req.body, (error, result) => {
        return res.send(error || result);
    })
};

ControllerHelper.prototype.updateById = function (req, res) {
    return this.service.updateById(req.params.id, req.body, (error, result) => {
        return res.send(error || result);
    })
};

ControllerHelper.prototype.incrementField = function (req, res) {
    return this.service.incrementField(req.params.id, req.body, req.body.key, (error, result) => {
        return res.send(error || result);
    })
};

module.exports = ControllerHelper;
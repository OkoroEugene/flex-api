const _repository = new(require('../repositories/BaseRepository'))();

function ServiceHelper() {
    this.repository = _repository;
}

ServiceHelper.prototype.save = function (data, callback) {
    checkKnownParameterTypes({
        callback
    });
    return this.repository.save(data, callback);
};

ServiceHelper.prototype.findAll = function (callback) {
    checkKnownParameterTypes({
        callback
    });
    return this.repository.findByParam(null, /* {
        sort: {
            _id: 1
        }
    } */ null, callback);
};

ServiceHelper.prototype.findById = function (id, callback) {
    checkKnownParameterTypes({
        callback
    });
    return this.repository.findById(id, callback);
};

ServiceHelper.prototype.findByParam = function (query, options, callback) {
    if (arguments.length === 2) callback = options, options = null;
    checkKnownParameterTypes({
        query,
        callback
    });
    return this.repository.findByParam(query, options, callback);
};

ServiceHelper.prototype.findByParamAndPopulate = function (query, options, callback) {
    if (arguments.length === 2) callback = options, options = null;
    checkKnownParameterTypes({
        query,
        callback
    });
    return this.repository.findByParamAndPopulate(query, options, callback);
};

ServiceHelper.prototype.findOneByParam = function (query, options, callback) {
    if (arguments.length === 2) callback = options, options = null;
    checkKnownParameterTypes({
        query,
        callback
    });
    return this.repository.findOneByParam(query, options, callback);
};

ServiceHelper.prototype.deleteById = function (id, callback) {
    checkKnownParameterTypes({
        callback
    });
    return this.repository.deleteById(id, callback);
};

ServiceHelper.prototype.deleteByParam = function (query, options, callback) {
    if (arguments.length === 2) callback = options, options = null;
    checkKnownParameterTypes({
        query,
        callback
    });
    return this.repository.deleteByParam(query, options, callback);
};

ServiceHelper.prototype.update = function (query, document, options, callback) {
    if (arguments.length < 3) throw new Error("update function expects at least 3 arguments");
    if (arguments.length === 3) callback = options, options = null;
    checkKnownParameterTypes({
        query,
        callback
    });
    return this.repository.update(query, document, options, callback);
};

ServiceHelper.prototype.updateById = function (id, document, options, callback) {
    if (arguments.length < 3) throw new Error("update function expects at least 3 arguments");
    if (arguments.length === 3) callback = options, options = null;
    checkKnownParameterTypes({
        // query,
        callback
    });
    return this.repository.updateById(id, document, options, callback);
};

ServiceHelper.prototype.incrementField = function (id, document, key, options, callback) {
    if (arguments.length < 3) throw new Error("update function expects at least 3 arguments");
    if (arguments.length === 3) callback = options, options = null;
    checkKnownParameterTypes({
        // query,
        callback
    });
    return this.repository.incrementField(id, document, key, options, callback);
};

module.exports = ServiceHelper;

function checkKnownParameterTypes({
    query = null,
    pipeline = null,
    callback = null
}) {
    if (query && typeof query !== 'object') throw new Error("query should be an object");
    if (pipeline && !Array.isArray(pipeline)) throw new Error("pipeline should be an array");
    if (callback && typeof callback !== 'function') throw new Error("callback should be a function");
}
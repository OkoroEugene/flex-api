function BaseRepository() {
    this.model = {};
}

BaseRepository.prototype.save = function (data, callback) {
    return this.model.create(data, (error, result) => error ? callback(error) : callback(null, result._id));
};

BaseRepository.prototype.findById = function (id, callback) {
    return this.model.findById(id, callback);
};

BaseRepository.prototype.findByParam = function (query, options, callback) {
    return this.model.find(query, options, callback);
};

BaseRepository.prototype.findByParamAndPopulate = function (query, options, callback) {
    return this.model.find(query).populate(options).exec(callback);
};

BaseRepository.prototype.findOneByParam = function (query, options, callback) {
    return this.model.findOne(query, options, callback);
};

BaseRepository.prototype.deleteById = function (id, callback) {
    return this.model.remove({
        _id: id
    }, callback);
};

BaseRepository.prototype.deleteByParam = function (query, options, callback) {
    return this.model.remove(query, options, callback);
};

BaseRepository.prototype.aggregate = function (pipeline, callback) {
    if (pipeline && !Array.isArray(pipeline)) throw new Error("pipeline should be an array");
    return this.model.aggregate(pipeline, callback);
};

BaseRepository.prototype.update = function (query, document, options, callback) {
    return this.model.updateMany(query, document, options, callback);
};

BaseRepository.prototype.updateById = function (id, document, options, callback) {
    return this.model.updateMany({
        _id: id
    }, document, options, callback);
};

BaseRepository.prototype.incrementField = function (id, document, key, options, callback) {
    return this.model.updateMany({
        _id: id
    }, {
            $inc: {
                [key]: document[key]
            }
        }, options, callback);
};

module.exports = BaseRepository;
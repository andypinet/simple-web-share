module.exports = {
    get(db, id) {
        return new Promise(function (resolve, reject) {
            db.get(id).then(function(doc) {
                resolve(doc);
            }).catch(function (err) {
                reject(err);
            });
        });
    },
    put(db, id, data) {
        var putdata = Object.assign({
            _id: id
        }, data);
        return new Promise(function (resolve, reject) {
            db.put(putdata).then(function(doc) {
                resolve(doc);
            }).catch(function (err) {
                reject(err);
            });
        });
    },
    update(db, id, data = {}) {
        var putdata = Object.assign({
            _id: id
        }, data);
        return new Promise(function (resolve, reject) {
            db.get(id).then(function(doc) {
                putdata = Object.assign(putdata, {
                    _rev: doc._rev
                });
                db.put(putdata).then(function (response) {
                    resolve(response);
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                if (err.status === 404) {
                    console.log("not found");
                    db.put(putdata).then(function (response) {
                        resolve(response);
                    }).catch(function (err) {
                        reject(err);
                    });
                } else {
                    reject(err);
                }
            });
        });
    }
};

let DBUtils = require("./dbutils");

var crypto = require("crypto");

let UserUtils = {
    randomID() {
        return new Promise(function (resolve, reject) {
            crypto.randomBytes(4, function(err, buffer) {
                if (err) {
                    reject(err);
                }
                resolve(buffer.toString('hex'));
            });
        })
    }
};

var userDb = {};

function getUserIDBYFingerPrint(fingerprint) {
    return new Promise(function (resolve, reject) {
        DBUtils.get(userDb, fingerprint).then(function (doc) {
            resolve(doc.userID);
        }).catch(function (e) {
            console.log(e);
            if (e.status === 404) {
                // 保存一条用户对比记录
                UserUtils.randomID().then(function (id) {
                    DBUtils.put(userDb, fingerprint, {userID: id}).then(function (response) {
                        resolve(id);
                    }).catch(function (e) {
                        console.log(e);
                    });
                });
            }
        });
    });
}

module.exports = function (globalData) {
    userDb = globalData.userDb;

    return {
        getUserIDBYFingerPrint
    }
};
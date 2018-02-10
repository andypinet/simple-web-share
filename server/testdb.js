var PouchDB = require('pouchdb');
var userDb= new PouchDB('user_db');
var { DBUtils } = require("./utils")({});

DBUtils.get(userDb, "doc").then(function (doc) {
    console.log(doc)
}).catch(function (e) {
    console.log(e);
});

DBUtils.update(userDb, "doc", {a: 2}).then(function (response) {
    console.log(response);
}).catch(function (e) {
    console.log(e);
});
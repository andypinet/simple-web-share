var pickBy = require("lodash/pickby");

module.exports = function (
    msgObj, userDb, ws, wss, users, serverUtils) {
    var { getUserIDBYFingerPrint } = require("../user")({
        userDb: userDb
    });

    var fingerprint = msgObj.fingerprint;
    var room = msgObj.room;

    // ws === targetCLient
    getUserIDBYFingerPrint(fingerprint).then(function (userID) {
        userID = userID + "_" + ws.upgradeReq.url;
        ws._uid = userID;
        console.log("一位失去梦想的群友加入了房间" + ws.upgradeReq.url + " " + new Date());
        wss.clients.forEach(client => {
            if (serverUtils.clientIsInCurrentRoom(client, ws) && serverUtils.clientIsOpenAndNotSelf(client, ws)) {
                // other users need to be notified of this new comer's presence
                serverUtils.send(client, "newUser", {
                    userID: userID
                })
            }
        });
    
        users[ userID ] = ws;

        var currentRoomUsers = pickBy(users, function (user) {
            return user.upgradeReq.url === ws.upgradeReq.url;
        });

        serverUtils.send(ws, "profile", {
            userID: userID,
            fingerprint: fingerprint,
            users: Object.keys(currentRoomUsers).map(v => {
                return {
                    userID: v
                }
            }),
            peersIDS: Object.keys(users)
        })

    }).catch(function (e) {
        console.log(e);
    });
};
var crypto = require("crypto");

var WebSocket = {};

let serverUtils = {
    send(client, msgType, data = {}) {
        client.send(JSON.stringify(Object.assign({
            msgType: msgType
        }, data)))
    },
    clientIsOpenAndNotSelf(client, ws) {
        return client !== ws && client.readyState === WebSocket.OPEN;
    },
    clientIsInCurrentRoom(client, ws) {
        return client.upgradeReq.url === ws.upgradeReq.url;
    },
    clientIsOpen(client) {
      return client && client.readyState === WebSocket.OPEN;
    }
};


let clientUtils = {
   notifyClientsRemoveSpecClient(clients, ws) {
      clients.forEach(client => {
        // if (client !== ws && client.readyState === WebSocket.OPEN){
        //   client.send(JSON.stringify({
        //     msgType: 'removeUser',
        //     userID: ws._uid
        //   }))
        // }
        if (serverUtils.clientIsInCurrentRoom(client, ws) && serverUtils.clientIsOpenAndNotSelf(client, ws)) {
          serverUtils.send(client, "removeUser", {
            userID: ws._uid
          })        
        } 
      });
   }
};

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

module.exports = function (globaldata) {
    WebSocket = globaldata.WebSocket;
    return {
        serverUtils,
        clientUtils,
        UserUtils,
    }
}
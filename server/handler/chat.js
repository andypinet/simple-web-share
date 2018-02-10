module.exports = function (
    msgObj, userDb, ws, wss, users, serverUtils) {
        console.log('------------------------------------');
        console.log(msgObj.to);
        console.log('------------------------------------');

        if (msgObj.to) {
            var client = users[msgObj.to.userID];
            if (serverUtils.clientIsOpen(client)) {// other users need to be notified of this new comer's presence
                serverUtils.send(client, "chat", Object.assign({
                    origin: msgObj
                },  {
                    from: msgObj.from
                }))

                serverUtils.send(ws, "chat", Object.assign({
                    origin: msgObj
                },  {
                    from: msgObj.from
                }))
            }
        } else {
            wss.clients.forEach(client => {
                if (serverUtils.clientIsOpen(client)) {// other users need to be notified of this new comer's presence
                    serverUtils.send(client, "chat", Object.assign({
                        origin: msgObj
                    },  {
                        from: msgObj.from   
                    }))
                }
            });
        }
};
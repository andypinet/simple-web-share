module.exports = function (
    msgObj, userDb, WebSocket, msg, ws, wss, users, serverUtils) {
    console.log('signaling data');
    // console.log('online users: ', users);
    var targetClient = users[msgObj.to];
    if (targetClient && targetClient.readyState === WebSocket.OPEN){
        console.log('relay signaling: ', msgObj);
        targetClient.send(msg)
    }
};
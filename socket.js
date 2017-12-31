function socketIO(http, server) {
    var io = require('socket.io').listen(server);

    var clients = 0;
    var roomno = 1;

    var users = [];
    io.on("connection", function (socket) {
        console.log("connected");

        socket.on('setUserName', function (username) {
            console.log(username);

            if (users.indexOf(username) > -1) {
                socket.emit('Exists', username + ' already exists! try different one');
            }
            else {
                users.push(username);
                socket.emit('userSet', {username: username});
            }
        });

        socket.on('msg', function(message){
            io.sockets.emit('newmsg', message);
        })

    });

}

module.exports = socketIO;
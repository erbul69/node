var io;

module.exports = function (_io){
    io = _io;
    io.of("/system", (socket) => {
        socket.on("chat_room_list", msg => {
            if(msg == "newuser") socket.emit("chat_room_list", namespaces());
        });
    });
};

function start(namespace) {
    io.of(namespace).on("connection", (socket) => {

        socket.data.username = socket.request.session.user || socket.request.session.id;
    
        socket.on('chat message', (msg) => {
            socket.broadcast.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
            console.log(socket.data.username + " disconnected");
            if(io.of(namespace).sockets.size == 0){
                const nsp = io._nsps.get(namespace);
                nsp.removeAllListeners();
                io._nsps.delete(namespace);
                io.of("/system").emit("chat_room_list", namespaces());
            } 
        });
    });
    io.of("/system").emit("chat_room_list", namespaces());
}

function namespaces(){
    let list = [];
    var iterator = io._nsps.keys();
    let itr = {};
    while(!itr.done){
        itr = iterator.next();
        if(itr.value && itr.value != "/system") list.push(itr.value);
    };
    return list;
}

function namecontrol(namespace){
    let response = true;
    var iterator = io._nsps.keys();
    let itr = {};
    while(!itr.done){
        itr = iterator.next();
        if(itr.value == namespace) response = false;
    };
    return response;
}

module.exports.start = start;
module.exports.namespaces = namespaces;
module.exports.namecontrol = namecontrol;

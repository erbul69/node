const socket = io(namespace);
const chatbox = document.querySelector('.chatbox');
const message = document.querySelector('.message');
const sendButton = document.querySelector('button');

sendButton.addEventListener('click', function(e) {
    if (message.value) {
        socket.emit('chat message', message.value);
        message.value = '';
    }
});

socket.on("connect", () => {
    document.querySelector(".session").innerHTML = namespace;
});

socket.on("connect_error", (error) => {
    if (socket.active) {
      // temporary failure, the socket will automatically try to reconnect
    } else {
      console.log(error.message);
    }
});

socket.on("disconnect", (reason, details) => {
    // ...
});

socket.on('chat message', (msg) => {
    chatbox.innerHTML += "<p>" + msg + "</p>";
});

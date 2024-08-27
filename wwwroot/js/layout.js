const systemsocket = io("/system");
const menuitem = document.querySelector(".new-room");
const menuitems = document.querySelectorAll(".chat-room");

systemsocket.emit("chat_room_list", "newuser");

systemsocket.on("chat_room_list", (data) => {
    chatRoomList(data);
});

function chatRoomList(items){
    const dropmenu = document.getElementById("namespaces");
    dropmenu.innerHTML = "";
    let i = 0;
    items.forEach(item => {
        var namespaceItem = document.createElement("div");
        namespaceItem.id = item;
        namespaceItem.className = "layout-dropitem";
        namespaceItem.innerText = i == 0 ? "Genel Sohbet" : "Sohbet Oda " + i; i++;
        dropmenu.appendChild(namespaceItem);
        namespaceItem.addEventListener("click", function(e){
            window.location = "/test/chat?namespace=" + item;
        })
    });    
};

menuitem.addEventListener("click", function(e){
    window.location = "/test/chat?namespace=new";
});


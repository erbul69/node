const express = require("express")
const router = express.Router();
const socket = require("../modules/socket");
const { v4: uuidv4 } = require('uuid');

function chat(req, res){
    if(req.query.namespace == "new"){
        namespace = "/" + uuidv4();
        socket.start(namespace);
        res.redirect("/test/chat?namespace=" + namespace);
    }
    else{ 
        namespace = req.query.namespace;
        res.render("test/chat", { title: "Chat", namespace: namespace});
    }
}

function postchat(req, res){
    const namespace = {};

    if(req.body.newroom){
        namespace.name = "/" + uuidv4();
        namespace.newroom = true;
    }
    else{
        namespace.name = req.body.namespace;
        namespace.newroom = false;
    }

    socket.start(namespace);
    res.locals.namespace = namespace.name;
    res.send(JSON.stringify(namespace.name));
}

router.get("/chat", chat);
router.post("/chat", postchat);

module.exports = router;

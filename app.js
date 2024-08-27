require('dotenv').config();
const http = require("http");
const express = require('express');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 80;
app.use("/", express.static("./wwwroot"));

const { Server } = require("socket.io");
const io = new Server(server);

const homeController = require("./controllers/homeController");
const projectController = require("./controllers/projectController");
const testController = require("./controllers/testController");

const socket = require("./modules/socket.js");
socket(io);
const sessionMiddleware = require('./modules/session.js');
app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

const bodyParser = require("body-parser");
app.use(
    bodyParser.json()
);

app.use((req, res, next) =>{
    res.locals.username = req.session.username;
    //res.locals.namespaces = socket.namespaces();
    next();
});

app.set('view engine', 'pug');
app.use('/', homeController);
app.use('/projects', projectController);
app.use('/test', testController);

server.listen(port, () => {
    console.log(`Web Server ${port} numaralı port üzerinde çalışıyor`);
});
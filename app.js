const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use('/', function(req, res){
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    res.send("Merhaba! ip adresiniz : " + ip);
});

app.listen(PORT, () => {
    console.log(`Web Server ${PORT} numaralı port üzerinde çalışıyor`);
});

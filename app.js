const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
let ipaddresses = [];

app.use("/setip", function(req.res){
    ipaddresses = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.send("Ip adresiniz kaydedildi");
]);

app.use("/getip", function(req.res){
    res.send("Merhaba! ip adresiniz : " + ipaddresses[0});
]);

app.listen(PORT, () => {
    console.log(`Web Server ${PORT} numaralı port üzerinde çalışıyor`);
});

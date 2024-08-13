const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use('/', function(req, res){
    res.send("Merhaba Dünya");
});

app.listen(PORT, () => {
    console.log(`Web Server ${PORT} numaralı port üzerinde çalışıyor`);
});
const express = require('express');
const app = express();
const port =  8000;



app.use('/', function(req, res){
    res.send("Merhaba Dünya");
});

app.listen(port, () => {
    console.log(`Web Server ${port} numaralı port üzerinde çalışıyor`);
});
const http = require("http");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
let ipaddresses = "";
let update_time = "";

const server = http.createServer(function(req, res){
    if(req.url == "/setip"){
        ipaddresses = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        update_time = getDate();
        res.end();
    }
    else if(req.url == "/getip"){
        let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>my home ip</title></head><body>';
        html += '<h2>Merhaba!</h2><p><b>Ip Adress:</b> ' + ipaddresses + '</p><p><b>Güncelleme:</b> ' + update_time + '</p></body></html>';
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(html);
    }
    else{
        res.write("Merhaba Dünya!");
        res.end();
    }
});

function getDate(){
    let date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    let hours = date_time.getHours();
    let minutes = date_time.getMinutes();
    let seconds = date_time.getSeconds();
    
    return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
};

server.listen(PORT, () => {
    console.log(`Web Server ${PORT} numaralı port üzerinde çalışıyor`);
});

const http = require("http");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
let ipaddresses = "";
let date_time = "";

const server = http.createServer(function(req, res){
    if(req.url == "/setip"){
        ipaddresses = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        date_time = new Date();
        res.end();
    }
    else if(req.url == "/getip"){
    const htmlString = "<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>my home ip</title></head><body>" +
        "<h2>Merhaba!</h2><p><b>Ip Adress: " + ip + "</b></p><p><b>Güncelleme:</b> " + getDate() + "</p></body></html>";
        res.write(htmlString);
        res.end();
    }

    else{
        res.write("Merhaba Dünya!");
        res.end();
    }
});

function getDate(){
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

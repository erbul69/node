const http = request("http")
const PORT = process.env.PORT || 3000;
require("dotenv").config();
let ipaddresses;

const server = http.createserver(function(req, res){
    if(req.url == "/setip"){
        ipaddresses = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        res.end("Ip adresiniz kaydedildi");
    }
    if(req.url == "/setip"){
        res.write("Merhaba! ip adresiniz : " + ipaddresses);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Web Server ${PORT} numaralı port üzerinde çalışıyor`);
});

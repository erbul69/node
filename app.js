const http = require("http");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
let ipaddresses = "";

const server = http.createServer(function(req, res){
    if(req.url == "/setip"){
        ipaddresses = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let date_time = new Date();
        res.write( date_time + ": Ip adresi günsellendi");
        res.end();
    }
    else if(req.url == "/getip"){
        res.write("Merhaba! ip adresiniz : " + ipaddresses);
        res.end();
    }

    else{
        res.write("Merhaba Dünya!");
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Web Server ${PORT} numaralı port üzerinde çalışıyor`);
});

const http = request("http")
const PORT = process.env.PORT || 3000;
require("dotenv").config();
let ipaddresses;

http.createserver(function(req, res){
    if(req.URL == "/setip"){
        ipaddresses = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        res.end("Ip adresiniz kaydedildi");
    }
    if(req.URL == "/setip"){
        res.send("Merhaba! ip adresiniz : " + ipaddresses);
        res.end();
    }
});

http.listen(PORT, () => {
    console.log(`Web Server ${PORT} numaralı port üzerinde çalışıyor`);
});

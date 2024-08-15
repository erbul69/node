const http = require("http");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
let ipaddresses = "";
let update_time = "";

const server = http.createServer(function(req, res){
    if(req.url == "/setip"){
        if (req.method == 'POST') {
            req.on('data', function(data) {
                let user = JSON.parse(data);
                if(user.username == process.env.username && user.password == process.env.password) {
                    ipaddresses = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                    update_time = Date();
                }
            });
            req.on('end', function() {
                res.end(ipaddresses.split(",")[0]);
            });
        }
        else{
            res.end();            
        };
    }
    else if(req.url == "/getip"){
        const ip = ipaddresses.split(",")[0];
        let datetime = update_time.toLocaleString("tr-TR");
        let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>my home ip</title></head><body>';
        html += '<h2>Merhaba!</h2><p><b>Ip Adress:</b> ' + ip + '</p><p><b>Güncelleme:</b> ' + datetime + '</p></body></html>';
        
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(html);
    }
    else{
        res.write("Merhaba Dünya!");
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Web Server ${PORT} numaralı port üzerinde çalışıyor`);
});

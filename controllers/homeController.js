const express = require("express");
const router = express.Router();
const db = require("./databaseController_mongo");

let ipaddresses = "";
let update_time = new Date();

function home(req, res){
    res.render('index', {title: "About me!"});
};

function resume(req, res){
    res.render('resume', {title: "Resume"});
};

function blog(req, res){
    res.render('blog', {title: "Blog"});
};

function contact(req, res){
    res.render('contact', {title: "Contact"});
};

function account(req, res){
    res.render('account', {title: "Account"});
};

function signin(req, res){
    res.render('signin', {title: "Signin"});
};

function signup(req, res){
    res.render('signup', {title: "Signup"});
};


async function postsignup(req, res){
    var result = await db.insert(req.body);
    if (result) {
        req.session.username = req.body.username;
        res.json(true);
    }
    else res.json(false);
};


async function postsignin(req, res){
    var result = await db.sign(req.body);
    if (result) { 
        req.session.username = req.body.username;
        res.json(true);
    }
    else res.json(false);
};

function signout(req, res){
    req.session.destroy((err) => {
        res.redirect('/');
    })    
};

function _setip(req, res){
// if(user.username == process.env.username && user.password == process.env.password) {
    ipaddresses = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ipaddress);
    update_time = new Date();
    console.log(ipaddresses.split(",")[0])

    res.send(ipaddresses.split(",")[0]);
}

function _getip(req, res){
    const ip = ipaddresses.split(",")[0];
    let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>my home ip</title></head><body>';
    html += '<h2>Merhaba!</h2><p><b>Ip Adress:</b> ' + ip + '</p><p><b>Güncelleme:</b><span id="date"> ' + '' + '</span></p></body>';
    html += '<script>document.getElementById("date").innerText = "' + update_time.toLocaleString("tr-TR", {timeZone: "Asia/Istanbul"}) + '" + " (GMT+3)";</script></html>'
    //res.set('Content-Type', 'text/html');
    res.send(html);
}

router.get("/", home);
router.get("/resume", resume);
router.get("/blog", blog);
router.get("/contact", contact);
router.get("/account", account);
router.get("/signin", signin);
router.get("/signup", signup);
router.get("/signout", signout);
router.post("/signup", postsignup);
router.post("/signin", postsignin);

router.get("/getip", _getip);
router.post("/setip", _setip);

module.exports = router;

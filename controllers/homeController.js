const express = require("express");
const router = express.Router();
const db = require("./databaseController_mongo");

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

module.exports = router;
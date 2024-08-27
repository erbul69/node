const session = require('express-session');

const sessionMiddleware = session({
    secret: process.env.SECRET, 
    resave: true,
    saveUninitialized: true,
    //cookie: { maxAge: 60000 } 
});

module.exports = sessionMiddleware;
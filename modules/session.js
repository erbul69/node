const session = require('express-session');

const sessionMiddleware = session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 300000 } 
});

module.exports = sessionMiddleware;

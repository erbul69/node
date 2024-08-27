const session = require('express-session');
const MemoryStore = require('memorystore')(session)

const sessionMiddleware = session({
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 300000 } 
});

module.exports = sessionMiddleware;

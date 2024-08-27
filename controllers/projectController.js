const express = require("express")
const router = express.Router();

function cube(req, res){
    res.render('projects/cube', { title: "Projects"});
}

function calc(req, res){
    res.render("projects/calc", { title: "Projects"});
}

router.get("/cube", cube);
router.get("/calc", calc);

module.exports = router;

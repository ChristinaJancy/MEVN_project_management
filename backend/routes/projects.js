const router = require("express").Router();
const schema = require("../models/projects")
const { verifyToken } = require("../validation")

module.exports = router;


router.post("/", verifyToken, (req, res) => {
    data = req.body;
    game.insertMany(data)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});
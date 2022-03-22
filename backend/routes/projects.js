const router = require("express").Router();
const schema = require("../models/projects")
const { verifyToken } = require("../validation")

module.exports = router;

router.get("/", verifyToken, (req, res) => {
    schema.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});
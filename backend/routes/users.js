const router = require("express").Router();
const schema = require("../models/users")
const { verifyToken } = require("../validation")

module.exports = router;


router.get("/", verifyToken, (req, res) => {
    schema.find()
        .then(data => { res.send(mapArr(data)); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});
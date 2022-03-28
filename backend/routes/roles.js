const router = require("express").Router();
const schema = require("../models/roles")
const { verifyToken } = require("../validation")

module.exports = router;

router.get("/", verifyToken, (req, res) => {
    schema.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

router.get("/:id", verifyToken, (req, res) => {
    const id = req.params.id
    schema.findById(id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

router.post("/", verifyToken, async (req,res) => {
    const tag = new schema({
        title: req.body.title,
        color: req.body.color
    })
    try { 
        const savedTag = await tag.save(); //save user
        res.json({ message: "New role created.😊", newtag : savedTag});
    } catch (error) { //if error, return error
        res.status(400).json({ error });
    }
})
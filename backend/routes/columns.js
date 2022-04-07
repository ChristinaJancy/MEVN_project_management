// setup router for /columns
const router = require("express").Router();
const schema = require("../models/columns")
const { verifyToken } = require("../validation")

module.exports = router;

// Get all columns
router.get("/", verifyToken, (req, res) => {
    schema.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

//Get column with id
router.get("/:id", verifyToken, (req, res) => {
    const id = req.params.id
    schema.findById(id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// Create new column
router.post("/", verifyToken, async (req, res) => {
    const column = new schema({
        title: req.body.title,
        tasks: req.body.tasks
    })
    try {
        const savedColumn = await column.save(); //save user
        res.json({ message: "New column created.😊", newcolumn: savedColumn });
    } catch (error) { //if error, return error
        res.status(400).json({ error });
    }
});
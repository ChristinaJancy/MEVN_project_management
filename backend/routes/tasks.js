const router = require("express").Router();
const schema = require("../models/tasks")
const { verifyToken } = require("../validation")

module.exports = router;

router.get("/", verifyToken, (req, res) => {
    schema.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// Get task with id
router.get("/:id", verifyToken, (req, res) => {
    const id = req.params.id
    schema.findById(id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

router.post("/", verifyToken, async (req,res) => {
    const status = "in progress";
    const task = new schema({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        status: status,
        assigned: req.body.assigned,
        tags: req.body.tags
    })
    try { 
        const savedTag = await task.save(); //save user
        res.json({ message: "New role created.😊", newtag : savedTag});
    } catch (error) { //if error, return error
        res.status(400).json({ error });
    }
})
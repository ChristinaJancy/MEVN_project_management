const router = require("express").Router();
const schema = require("../models/projects")
const { verifyToken } = require("../validation")

module.exports = router;

router.get("/", verifyToken, (req, res) => {
    schema.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// get project by id
router.get("/:id", verifyToken, (req, res) => {
    schema.findById(req.params.id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// Create new project
router.post("/", verifyToken, async (req, res) => {
    const project = new schema({
        title: req.body.title,
        deadline: req.body.deadline,
        description: req.body.description,
        tags: req.body.tags,
        columns: req.body.columns
    })
    try{
        const savedProject = await project.save()
            .then(data => { res.json({ message: "New project created.😊", newproject: savedProject }); })
            .catch(err => { res.status(500).json({ message: err.message }) })
    }catch{
        res.status(400).json({ message: "Error creating project." })
    }
});
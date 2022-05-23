const router = require("express").Router();
const schema = require("../models/projectTemplates")
const { verifyToken } = require("../validation")

module.exports = router;

// Get all project templates
router.get("/", verifyToken, (req, res) => {
    schema.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// Get project template by id
router.get("/:id", verifyToken, (req, res) => {
    const id = req.params.id
    schema.findById(id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// Create new project template
router.post("/", verifyToken, async (req, res) => {
    const template = new schema({
        title: req.body.title,
        description: req.body.description,
        columns: req.body.columns
    })

    try {
        const savedTemplate = await template.save()
        res.json({ message: "New project template created.😊", newtemplate: savedTemplate })
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Update project template by id
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedTemplate = await schema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json({ message: "Project template updated.😊", updatedTemplate })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Delete project template by id
router.delete("/:id", verifyToken, async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await schema.findByIdAndRemove(id)
        res.json({ message: "Project template deleted.😊", deleted })
    } catch (error) {
        res.status(500).json({ error })
    }
});

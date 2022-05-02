const router = require("express").Router();
const schema = require("../models/projectTemplates")
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

router.post("/", verifyToken, async (req, res) => {
    const template = new schema({
        name: req.body.name,
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

//update project template by id
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedTemplate = await schema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json({ message: "Project template updated.😊", updatedTemplate })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//Delete project template by id
router.delete("/:id", verifyToken, async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await schema.findByIdAndRemove(id)
        res.json({ message: "Project template deleted.😊", deleted })
    } catch (error) {
        res.status(500).json({ error })
    }
});

const router = require("express").Router();
const schema = require("../models/tags")
const tasks = require("../models/tasks")
const projects = require("../models/projects")

const { verifyToken } = require("../validation")

module.exports = router;

// Get all tags
router.get("/", verifyToken, (req, res) => {
    schema.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// Get tag by id
router.get("/:id", verifyToken, (req, res) => {
    const id = req.params.id
    schema.findById(id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// Create new tag
router.post("/", verifyToken, async (req,res) => {
    const tag = new schema({
        title: req.body.title,
        color: req.body.color
    })
    try { 
        const savedTag = await tag.save(); //save user
        res.json({ message: "New tag created.😊", newtag : savedTag});
    } catch (error) {
        res.status(400).json({ error });
    }
})

// Update project tag by id
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedTag = await schema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json({ message: "Tag updated.😊", updatedTag })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Delete project tag by id and remove project tag from all projects
router.delete("/:id", verifyToken, async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await schema.findByIdAndRemove(id)
        await tasks.updateMany({ tags: id }, { $pull: { tags: id } })
        await projects.updateMany({ tags: id }, { $pull: { tags: id } })
        res.json({ message: "Project tag deleted.😊", deleted })
    } catch (error) {
        res.status(500).json({ error })
    }
})
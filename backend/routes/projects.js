const router = require("express").Router();
const schema = require("../models/projects")
const { verifyToken } = require("../validation")
const column = require("../models/columns")
const tasks = require("../models/tasks")
const { deleteColumn } = require("./columns")
const { encodeHtmlEntities } = require("../modules/InputSanitizer");


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
        columns: req.body.columns,
        assigned: req.body.assigned
    })
    try {
        const savedProject = await project.save()
        res.json({ message: "New project created.😊", newproject: savedProject })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Update project by id
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedProject = await schema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json({ message: "Project updated.😊", updatedProject })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Delete project by id and all columns and tasks in it
router.delete("/:id", verifyToken, async (req, res) => {
    const id = req.params.id
    try {
        await schema.findById(id).then(data => {
            const columns = data.columns
            if (columns.length > 0) {
                for (let i = 0; i < columns.length; i++) {
                    const columnId = columns[i]._id
                    deleteColumn(columnId, column, tasks).then(data => {
                        if (data.error) {
                            res.status(500).send({ message: data.error.message })
                        }
                    })
                }
            }
        })
        const deleteProject = await schema.findByIdAndRemove(id)
        res.json({ message: "Project deleted.😊", deletedproject: deleteProject })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
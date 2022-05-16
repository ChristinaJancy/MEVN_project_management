const router = require("express").Router();
const schema = require("../models/projects")
const { verifyToken } = require("../validation")
const column = require("../models/columns")
const tasks = require("../models/tasks")
const { deleteColumn } = require("./columns");

module.exports = router;

// Get all projects
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
    const assignColumns = async (bodyColumns) => {
        if (bodyColumns === []) {
            const columns = [];
            return columns;
        } else {
            // if there are columns in the project create new columns with that name
            const columns = [];
            columnNames = bodyColumns;
            await columnNames.forEach(async columnName => {
                const columnObject = new column({
                    title: columnName,
                    tasks: []
                })
                const savedColumn = await columnObject.save()
                columns.push(savedColumn._id.valueOf())
                console.log("columns inside forEach", columns)
            });
            console.log("columns outside forEach", columns)
            return columns;
        };
    };

    try {
        const projectSchema = await assignColumns(req.body.columns).then(columns => {
            console.log(columns)
            const project = new schema({
                title: req.body.title,
                deadline: req.body.deadline,
                description: req.body.description,
                tags: req.body.tags,
                columns: columns,
                assigned: req.body.assigned
            })
            return project
        });
        
        console.log(projectSchema)
        const savedProject = await projectSchema.save()
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
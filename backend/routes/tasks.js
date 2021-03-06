const router = require("express").Router();
const schema = require("../models/tasks")
const columns = require("../models/columns")
const projects = require("../models/projects")
const { verifyToken } = require("../validation")

module.exports = router;

// Get all tasks
router.get("/", verifyToken, (req, res) => {
    schema.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// Create new task
router.post("/:columnId", verifyToken, async (req, res) => {
    const task = new schema({
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        status: req.body.status,
        assigned: req.body.assigned,
        tags: req.body.tags
    })
    try {
        task.save()
            .then(savedTask => {
                columns.findByIdAndUpdate(req.params.columnId, { $push: { tasks: savedTask._id } }, { new: true })
                    .then(updatedColumn => {
                        res.json({ message: "New task created.😊", newtask: savedTask })
                    })
            });
    } catch (error) {
        res.status(400).json({ error });
    }
})

// Get 10 tasks with userId depening on deadline
router.get("/user/:userId", verifyToken, (req, res) => {
    schema.find({ assigned: req.params.userId, deadline: { $gte: new Date() } })
        .limit(10)
        .sort({ deadline: 1 })
        .then(data => {
            let projectIds = [];
            let tasksData = data
            const getProjectIds = (tasksData, index) => {
                if (index === tasksData.length) {
                    res.json({tasks: tasksData, projectIds})
                } else {
                    const task = tasksData[index];
                    columns.find({ tasks: task._id }).then(column => {
                        projects.find({ columns: column[0]._id }).then(project => {
                            projectIds.push(project[0]._id)
                            getProjectIds(tasksData, index + 1)
                        })
                    })
                }
            }
            getProjectIds(tasksData, 0)
        })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// Get task with id
router.get("/:id", verifyToken, (req, res) => {
    const id = req.params.id
    schema.findById(id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// Update task by id
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedTask = await schema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json({ message: "Task updated.😊", updatedTask })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Delete task by id
router.delete("/:id", verifyToken, async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await schema.findByIdAndRemove(id)
        res.json({ message: "Task deleted.😊", deleted })
    } catch (error) {
        res.status(500).json({ error })
    }
})


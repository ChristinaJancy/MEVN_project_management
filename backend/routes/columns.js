// setup router for /columns
const router = require("express").Router();
const schema = require("../models/columns")
const tasks = require("../models/tasks")
const { verifyToken } = require("../validation")



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

//Update column by id
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedColumn = await schema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Column updated.😊", updatedColumn });
    } catch (error) {
        res.status(400).json({ error });
    }
});



// Function to delete a column and all tasks in it
const deleteColumn = async (id, column, tasks) => {
    try {
        let taskIds = [];
        let task;
        await column.findById(id).then(data => {
            task = data.tasks
            if (task.length > 0) {
                for (let i = 0; i < task.length; i++) {
                    taskIds.push(task[i]._id)
                }
            }
        })
        const deleted = await column.findByIdAndRemove(id)
        const deletedTasks = await tasks.deleteMany({ _id: { $in: taskIds } })
        return { deleted, deletedTasks }
    } catch (error) {
        return { error }
    }
}

//Delete column by id and all tasks in column
router.delete("/:id", verifyToken, async (req, res) => {
    const id = req.params.id
    await deleteColumn(id, schema, tasks).then(data => {
        if (data.error) {
            res.status(500).send({ message: data.error.message })
        } else {
            res.json({ message: "Column deleted.😢", deleted: data.deleted, deletedTasks: data.deletedTasks })
        }
    })
})

module.exports = { deleteColumn, router}
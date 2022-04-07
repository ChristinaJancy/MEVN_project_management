const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

let objectSchema = new Schema(
    {
        title: { type: String, required: true, min: 2, max: 255 },
        tasks:[{
            type: Schema.Types.ObjectId,
            ref: 'task',
            autopopulate: true
        }]
    }
)

objectSchema.plugin(autopopulate);
module.exports = mongoose.model("column", objectSchema);
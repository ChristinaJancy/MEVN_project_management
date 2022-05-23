const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const { ObjectId } = require("mongodb");
const autopopulate = require("mongoose-autopopulate");

let objectSchema = new Schema(
    {
        title: { type: String, required: true, min: 2, max: 255 },
        description: { type: String, required: true, min: 6, max: 255 },
        deadline: { type: Date, required: true },
        status: { type: String, required: true },
        assigned: [ {
            type: Schema.Types.ObjectId,
            ref: 'user',
            autopopulate: {select: ['name', 'avatarPicture', 'initials']}
        }],
        tags:[{
            type: Schema.Types.ObjectId,
            ref: 'tag',
            autopopulate: true
            //autopopulate: {select: ['name', 'color']}
        }]
    }
)

objectSchema.plugin(autopopulate);
module.exports = mongoose.model("task", objectSchema);
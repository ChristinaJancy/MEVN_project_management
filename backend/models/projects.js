const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

//Mongoose schema for structuring data
let objectSchema = new Schema({
    title: { type: String, required: true },
    deadline: { type: Date, required: true },
    description: { type: String, required: true },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag',
        autopopulate: true
    }],
    columns: [{
        type: Schema.Types.ObjectId,
        ref: 'column',
        autopopulate: true
    }],
    assigned: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'user', 
        autopopulate: true 
    }]
});

objectSchema.plugin(autopopulate);
module.exports = mongoose.model("project", objectSchema);
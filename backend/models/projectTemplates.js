const mongoose = require("mongoose");
const schema = mongoose.Schema;


//Mongoose schema for structuring data
let objectSchema = new schema({
    name: {type: String, required: true },
    description: {type: String, required: true }, 
    columns: [{type: String, required: true }], //array of column names
});

module.exports = mongoose.model("projectTemplate", objectSchema);
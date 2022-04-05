const mongoose = require("mongoose");
const schema = mongoose.Schema;


//Mongoose schema for structuring data
let objectSchema = new schema({
    name: {type: String}
});

module.exports = mongoose.model("project", objectSchema);
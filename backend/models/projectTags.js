const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Mongoose schema for structuring data
let objectSchema = new schema({
    name: {type: String, required: true },
    color: {type: String, required: true, match: /^#(?:[0-9a-fA-F]{3}){1,2}$/ } //Only accepts hexidecimal color values
});

module.exports = mongoose.model("projectTag", objectSchema);
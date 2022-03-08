const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// userschema for user collection in mongodb   
let objectSchema = new Schema(
    {
        name: { type: String, required: true, min: 6, max: 255 },
        email: { type: String, required: true, min: 6, max: 255 },
        password: { type: String, required: true, min: 6, max: 255 },
        date: { type: Date, default: Date.now }
    }
)




module.exports = mongoose.model("user", objectSchema);
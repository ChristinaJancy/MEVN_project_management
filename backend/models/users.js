const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

// userschema for user collection in mongodb
let objectSchema = new Schema({
    name: { type: String, required: true, min: 6, max: 255 },
    email: { type: String, required: true, min: 6, max: 255 },
    password: { type: String, required: true, min: 6, max: 255 },
    created_at: { type: Date, default: Date.now },
    last_updated_at: { type: Date, default: Date.now },
    initials: { type: String, required: true, },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'role',
        autopopulate: true
    }]
})



objectSchema.plugin(autopopulate);
module.exports = mongoose.model("user", objectSchema);
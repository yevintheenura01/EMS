const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);  // Import mongoose-sequence

const RegSchema = new Schema({
    userID: {
        type: Number, 
        unique: true // Ensure unique user IDs
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Apply auto-increment plugin for userID
RegSchema.plugin(AutoIncrement, { inc_field: 'userID', start_seq: 1 });

module.exports = mongoose.model(
    "Register",
    RegSchema
);

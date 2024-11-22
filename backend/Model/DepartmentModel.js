const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: true
    // },
    code: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    manager: {
        type: String,
        required: true,
        trim: true,
    }
    }, { timestamps: true });

    module.exports = mongoose.model("Department", departmentSchema);

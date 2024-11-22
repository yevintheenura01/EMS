const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForgotPasswordSchema = new Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 }, // Token expires in 1 hour
});

module.exports = mongoose.model("ForgotPassword", ForgotPasswordSchema);

// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
//   _id: {
//     type: String,
//     required: true
// },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  hireDate: {
    type: Date,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);

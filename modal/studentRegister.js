const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    default: 0,
  },
  arrears_count: {
    type: Number,
    default: 0,
  },
});

const Student = mongoose.model("Students", studentSchema);

module.exports = Student;

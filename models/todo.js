import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  user: {
    name: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  title: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    trim: true,
  },
  duedate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

 const Task = mongoose.model("Task", todoSchema);

 export default Task
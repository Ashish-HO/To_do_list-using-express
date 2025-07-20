import express from "express";
import Joi from "joi";
import User from "../models/user.js";
import Task from "../models/todo.js";

import auth from "../middleware/auth.js";

const router = express.Router();

//get all tasks of a user
router.get("/", auth, async function (req, res) {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("invalid user id");

  const tasks = await Task.find({ "user.email": user.email }).select("-user ");
  res.status(200).send(tasks);
});

//get particular task
router.get("/:taskid", auth, async function (req, res) {
  let task = await Task.findById(req.params.taskid);

  if (!task) return res.status(400).send("invalid task id");

  task = await Task.find({ _id: task._id }).select("-user -_id");
  res.send(task);
});

//create a task
router.post("/", auth, async function (req, res) {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user id");

  const task = new Task({
    user: {
      name: user.name,
      email: user.email,
    },
    title: req.body.title,
    description: req.body.description,
    duedate: req.body.duedate,
  });

  await task.save();
  res.status(201).send(task);
});

// update particular task
router.put("/:taskId", auth, async function (req, res) {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findById(req.params.taskId);

  if (!task) return res.status(400).send("Invalid userId or TaskId");

  const newTask = req.body;

  Object.keys(newTask).forEach((key) => {
    task[key] = newTask[key];
  });

  res.send(task);
});

// mark  task as complete

router.patch("/:taskId", auth, async function (req, res) {
  const task = await Task.findById(req.params.taskId);

  if (!task) return res.status(400).send("Invalid taskId");

  task.completed = true;
  await task.save();
  res.send(task);
});

//delete task
router.delete("/:taskId", auth, async function (req, res) {
  let task = await Task.findById(req.params.taskId);

  if (!task) return res.status(400).send("Invalid TaskId");
  task = await Task.findByIdAndDelete(req.params.taskId);
  res.send(task);
});

function validateTask(task) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().min(5).max(255).required().trim(),
    description: Joi.string().min(5).max(255).required().trim(),
    duedate: Joi.date().required(),
    priority: Joi.string().valid("low", "medium", "high"),
  });
  return schema.validate(task);
}

export default router;

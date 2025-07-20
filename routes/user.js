import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";

import User from "../models/user.js";
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//get user
router.get("/", [auth, admin], async function (req, res) {
  const users = await User.find().select("-password -isAdmin ");
  res.send(users);
});

//register user

router.post("/", async function (req, res) {
  //invalid input
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //user already registered
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  //new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    isAdmin: req.body.isAdmin || false, //need to mention false manually
  });
  await newUser.save();
  return res.status(201).send(newUser);
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(255).required(),
    isAdmin: Joi.bool(),
  });
  return schema.validate(user);
}

export default router;

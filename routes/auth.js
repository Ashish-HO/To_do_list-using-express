import bcrypt from "bcrypt";
import express from "express";
import Joi from "joi";

import User from "../models/user.js";

const router = express.Router();

router.post("/", async function (req, res) {
  //validate user input
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user is registered or not
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User doesnot exists.");

  //compare password
  const validuser = await bcrypt.compare(req.body.password, user.password);
  if (!validuser) return res.status(400).send("Incorrect Email or password");

  const token = user.generateAuthToken();

  return res.header("x-auth-token", token ).status(200).send(user);
});

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).max(64).required(),
  });
  return schema.validate(user);
}

export default router;

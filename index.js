import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import taskRouter from "./routes/task.js";

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 5000;

//connect to database and listen to port
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening to port ${port}...`);
    });
  })
  .catch((err) => console.log(err));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import employee from "./routes/employee";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

mongoose
  .connect("mongodb://localhost:27017/HW20")
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use("/api/employee", employee);

app.get("/test", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(globalErrorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
